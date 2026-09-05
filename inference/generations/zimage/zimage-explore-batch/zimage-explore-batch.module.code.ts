import { appendFile, copyFile, mkdir, readFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, join } from "node:path"
import { buildModelGraph } from "../zimage-graph/zimage-graph.module.code.ts"
import { MODELS, toModelId } from "../zimage-models/zimage-models.module.code.ts"

export type Rendered = { readonly filename: string; readonly subfolder: string }

type History = Record<string, { outputs?: Record<string, { images?: Rendered[] }> }>

const DEFAULT_PORT = "8678"

const POLL_MS = 1500

const DEADLINE_MS = 900_000

const SEED_CEILING = 2 ** 31

export function drawSeed(): number {
  return Math.floor(Math.random() * SEED_CEILING)
}

export function baseOf(): string {
  return `http://127.0.0.1:${process.env.ZIMAGE_PORT ?? DEFAULT_PORT}`
}

export function homeOf(): string {
  return process.env.ZIMAGE_HOME ?? join(homedir(), ".local", "share", "zimage")
}

export async function submitted(base: string, graph: unknown): Promise<string> {
  const res = await fetch(`${base}/prompt`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: graph, client_id: crypto.randomUUID() }),
  })
  if (!res.ok) throw new Error(`POST /prompt ${res.status}: ${await res.text()}`)
  const { prompt_id: promptId } = (await res.json()) as { prompt_id: string }
  return promptId
}

export async function renderedIn(base: string, promptId: string): Promise<Rendered | undefined> {
  const deadline = Date.now() + DEADLINE_MS
  let found: Rendered | undefined
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, POLL_MS))
    const answer = await fetch(`${base}/history/${promptId}`)
    if (!answer.ok) continue
    const history = (await answer.json()) as History
    const entry = history[promptId]
    if (entry === undefined) continue
    for (const node of Object.values(entry.outputs ?? {})) {
      const image = node.images?.[0]
      if (image !== undefined) found = image
    }
    if (found !== undefined) return found
  }
  return undefined
}

export async function exploreBatch(
  modelRaw: string,
  width: number,
  height: number,
  outDir: string,
  promptFiles: readonly string[]
): Promise<void> {
  const modelId = toModelId(modelRaw)
  if (modelId === undefined) throw new Error(`unregistered model '${modelRaw}'`)
  const spec = MODELS[modelId]
  const base = baseOf()
  const home = homeOf()
  await mkdir(outDir, { recursive: true })
  for (const promptFile of promptFiles) {
    const stem = basename(promptFile).replace(/\.txt$/, "")
    const prompt = (await readFile(promptFile, "utf8")).trim()
    const seed = drawSeed()
    const graph = buildModelGraph(spec, {
      prompt,
      negativePrompt: spec.defaultNegative,
      width,
      height,
      steps: spec.defaultSteps,
      guidance: spec.defaultGuidance,
      seed,
      loraStrength: 1.0,
      filenamePrefix: `explore/${stem}-${seed}`,
    })
    const image = await renderedIn(base, await submitted(base, graph))
    if (image === undefined) throw new Error(`${stem}: timed out waiting for output`)
    await copyFile(
      join(home, "outputs", image.subfolder, image.filename),
      join(outDir, `${stem}.png`)
    )
    await appendFile(
      join(outDir, ".seeds.tsv"),
      `${stem}\t${seed}\t${modelId}\t${width}x${height}\t${prompt.replace(/\s+/g, " ")}\n`
    )
    console.log(`${stem}.png  seed=${seed}`)
  }
  console.log("=== batch complete ===")
}

async function main(): Promise<void> {
  const [modelRaw, widthRaw, heightRaw, outDirRaw, ...promptFiles] = process.argv.slice(2)
  if (outDirRaw === undefined) throw new Error("missing out-dir")
  await exploreBatch(modelRaw ?? "", Number(widthRaw), Number(heightRaw), outDirRaw, promptFiles)
}

if (import.meta.main) {
  void main()
}
