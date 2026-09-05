import type { ComfyGraph } from "@akasha/comfy/comfy-graph"
import { z } from "zod"

export type { ComfyGraph, ComfyInputValue, ComfyLink, ComfyNode } from "@akasha/comfy/comfy-graph"

const UploadSchema = z.looseObject({
  name: z.string(),
  subfolder: z.string().default(""),
  type: z.string().default("input"),
})
const PromptSchema = z.looseObject({
  prompt_id: z.string(),
  node_errors: z.record(z.string(), z.unknown()).default({}),
})
const ImageRefSchema = z.looseObject({
  filename: z.string(),
  subfolder: z.string().default(""),
  type: z.string().default("output"),
})
const HistoryEntrySchema = z.looseObject({
  prompt: z.array(z.unknown()).optional(),
  outputs: z
    .record(z.string(), z.looseObject({ images: z.array(ImageRefSchema).optional() }))
    .default({}),
  status: z
    .looseObject({ status_str: z.string().optional(), completed: z.boolean().optional() })
    .optional(),
})
const HistorySchema = z.record(z.string(), HistoryEntrySchema)

export type HistoryEntry = z.infer<typeof HistoryEntrySchema>

export interface ImageRef {
  readonly filename: string
  readonly subfolder: string
  readonly type: string
}

export interface ComfyRunRequest {
  readonly baseUrl: string
  readonly upload?: { readonly bytes: Uint8Array; readonly name: string }
  readonly buildGraph: (storedUploadName: string | undefined) => ComfyGraph
  readonly pollDeadlineMs: number
  readonly onProgress?: (msg: string) => void
}

export interface ComfyRunResult {
  readonly promptId: string
  readonly image: ImageRef
  readonly uploadedName: string | undefined
}

const POLL_INTERVAL_MS = 2500

export type PollDecision =
  | { readonly kind: "image"; readonly image: ImageRef }
  | { readonly kind: "error"; readonly message: string }
  | { readonly kind: "recover" }
  | { readonly kind: "pending" }

function outputImageOf(entry: HistoryEntry): ImageRef | undefined {
  const images = Object.values(entry.outputs).flatMap((o) => o.images ?? [])
  return images.find((i) => i.type === "output") ?? images[0]
}

export function decidePollStep(entry: HistoryEntry | undefined): PollDecision {
  if (entry === undefined) return { kind: "pending" }
  if (entry.status?.status_str === "error") {
    return { kind: "error", message: `ComfyUI run failed: ${JSON.stringify(entry.status)}` }
  }
  const image = outputImageOf(entry)
  if (image !== undefined) return { kind: "image", image }
  const terminal = entry.status?.completed === true || entry.status?.status_str === "success"
  return terminal ? { kind: "recover" } : { kind: "pending" }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function canonicalize(value: unknown): string {
  const sortDeep = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(sortDeep)
    if (isRecord(v)) {
      return Object.fromEntries(
        Object.keys(v)
          .sort()
          .map((k) => [k, sortDeep(v[k])])
      )
    }
    return v
  }
  return JSON.stringify(sortDeep(value))
}

export function selectCachedOutput(
  history: Record<string, HistoryEntry>,
  graph: ComfyGraph
): ImageRef | undefined {
  const target = canonicalize(graph)
  let best: { readonly order: number; readonly image: ImageRef } | undefined
  for (const entry of Object.values(history)) {
    const stored = entry.prompt
    if (stored === undefined || canonicalize(stored[2]) !== target) continue
    const image = outputImageOf(entry)
    if (image === undefined) continue
    const order = typeof stored[0] === "number" ? stored[0] : -1
    if (best === undefined || order > best.order) best = { order, image }
  }
  return best?.image
}

export async function runComfyGraph(req: ComfyRunRequest): Promise<ComfyRunResult> {
  const note = req.onProgress ?? (() => {})

  let storedName: string | undefined
  if (req.upload !== undefined) {
    note("uploading input image...")
    const form = new FormData()
    form.append("image", new Blob([new Uint8Array(req.upload.bytes)]), req.upload.name)
    form.append("overwrite", "true")
    const upRes = await fetch(`${req.baseUrl}/upload/image`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(180_000),
    })
    if (!upRes.ok) throw new Error(`ComfyUI /upload/image ${upRes.status}: ${await upRes.text()}`)
    const up = UploadSchema.parse(await upRes.json())
    storedName = up.subfolder === "" ? up.name : `${up.subfolder}/${up.name}`
  }

  const graph = req.buildGraph(storedName)
  const promptRes = await fetch(`${req.baseUrl}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: graph }),
    signal: AbortSignal.timeout(120_000),
  })
  if (!promptRes.ok)
    throw new Error(`ComfyUI /prompt ${promptRes.status}: ${await promptRes.text()}`)
  const prompt = PromptSchema.parse(await promptRes.json())
  if (Object.keys(prompt.node_errors).length > 0) {
    throw new Error(`ComfyUI rejected the graph: ${JSON.stringify(prompt.node_errors)}`)
  }
  note(`queued prompt ${prompt.prompt_id}; running (a cold load can take minutes)...`)

  const started = performance.now()
  const deadline = started + req.pollDeadlineMs
  for (;;) {
    await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS))
    let histRes: Response
    try {
      histRes = await fetch(`${req.baseUrl}/history/${prompt.prompt_id}`, {
        signal: AbortSignal.timeout(30_000),
      })
    } catch (err) {
      if (performance.now() >= deadline) {
        throw new Error(`ComfyUI /history unreachable (${String(err)}) and poll deadline exceeded`)
      }
      continue
    }
    if (!histRes.ok) {
      if (performance.now() >= deadline) {
        throw new Error(`ComfyUI /history ${histRes.status} and poll deadline exceeded`)
      }
      continue
    }
    const entry = HistorySchema.parse(await histRes.json())[prompt.prompt_id]
    const decision = decidePollStep(entry)
    if (decision.kind === "error") throw new Error(decision.message)
    if (decision.kind === "image") {
      note(`completed in ${Math.round((performance.now() - started) / 1000)}s`)
      return { promptId: prompt.prompt_id, image: decision.image, uploadedName: storedName }
    }
    if (decision.kind === "recover") {
      note("graph fully cached by ComfyUI; recovering the prior identical render from history...")
      let fullRes: Response | undefined
      try {
        fullRes = await fetch(`${req.baseUrl}/history`, { signal: AbortSignal.timeout(30_000) })
      } catch {
        fullRes = undefined
      }
      if (fullRes?.ok) {
        const history = HistorySchema.parse(await fullRes.json())
        const cached = selectCachedOutput(history, graph)
        if (cached !== undefined) {
          note(`served cached render in ${Math.round((performance.now() - started) / 1000)}s`)
          return { promptId: prompt.prompt_id, image: cached, uploadedName: storedName }
        }
        throw new Error(
          `ComfyUI served prompt ${prompt.prompt_id} entirely from cache (no new output) and no prior identical render exists in history to recover`
        )
      }
    }
    if (performance.now() >= deadline) {
      throw new Error(
        `run did not complete within ${Math.round(req.pollDeadlineMs / 1000)}s (prompt ${prompt.prompt_id})`
      )
    }
    note(`still running (${Math.round((performance.now() - started) / 1000)}s)...`)
  }
}

export async function freeComfyMemory(baseUrl: string): Promise<void> {
  const res = await fetch(`${baseUrl}/free`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unload_models: true, free_memory: true }),
    signal: AbortSignal.timeout(30_000),
  })
  if (!res.ok) throw new Error(`ComfyUI /free ${res.status}: ${await res.text()}`)
}

export async function fetchImage(baseUrl: string, image: ImageRef): Promise<Uint8Array> {
  const q = new URLSearchParams({
    filename: image.filename,
    subfolder: image.subfolder,
    type: image.type,
  })
  const res = await fetch(`${baseUrl}/view?${q.toString()}`, {
    signal: AbortSignal.timeout(120_000),
  })
  if (!res.ok) throw new Error(`ComfyUI /view ${res.status}: ${await res.text()}`)
  return new Uint8Array(await res.arrayBuffer())
}
