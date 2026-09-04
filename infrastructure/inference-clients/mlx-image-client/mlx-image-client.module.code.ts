import { InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

export interface GenerationBody {
  readonly model: string
  readonly prompt: string
  readonly size: string
  readonly seed: number
  readonly guidance_scale?: number
  readonly steps?: number
}

export function buildGenerationBody(input: {
  model: string
  prompt: string
  size: string
  seed: number
  guidance?: number
  steps?: number
}): GenerationBody {
  return {
    model: input.model,
    prompt: input.prompt,
    size: input.size,
    seed: input.seed,
    ...(input.guidance !== undefined ? { guidance_scale: input.guidance } : {}),
    ...(input.steps !== undefined ? { steps: input.steps } : {}),
  }
}

export function parseSize(size: string): { width: number; height: number } {
  const parts = size.split("x")
  const width = Number(parts[0])
  const height = Number(parts[1])
  const ok =
    parts.length === 2 &&
    Number.isInteger(width) &&
    width > 0 &&
    Number.isInteger(height) &&
    height > 0
  if (!ok) throw new InputError(`--size must be WxH (e.g. 1024x1024), got '${size}'`)
  return { width, height }
}

export const GEN_SIZE_MIN = 256
export const GEN_SIZE_MAX = 4096
export const GEN_SIZE_MULTIPLE = 16

export function parseGenerationSize(size: string): { width: number; height: number } {
  const { width, height } = parseSize(size)
  for (const [label, value] of [
    ["width", width],
    ["height", height],
  ] as const) {
    if (value < GEN_SIZE_MIN || value > GEN_SIZE_MAX) {
      throw new InputError(
        `--size ${label} must be between ${GEN_SIZE_MIN} and ${GEN_SIZE_MAX}, got ${value}`
      )
    }
    if (value % GEN_SIZE_MULTIPLE !== 0) {
      throw new InputError(
        `--size ${label} must be a multiple of ${GEN_SIZE_MULTIPLE}, got ${value}`
      )
    }
  }
  return { width, height }
}

const ImageResponseSchema = z.object({
  data: z.array(z.object({ b64_json: z.string() })).min(1),
})

function decodeFirstPng(parsed: z.infer<typeof ImageResponseSchema>): Uint8Array {
  const first = parsed.data[0]
  if (first === undefined) throw new OperationalError("image response had no data")
  return Uint8Array.from(atob(first.b64_json), (c) => c.charCodeAt(0))
}

function poolTimeoutMessage(op: string, timeoutMs: number): string {
  return `${op} timed out after ${Math.round(timeoutMs / 1000)}s — the macbook pool serializes requests FIFO and this budget counts against the queue wait, so the request may have been queued behind another inference (e.g. a slow edit). Raise --timeout or reduce concurrency.`
}

export async function runGeneration(args: {
  baseUrl: string
  body: GenerationBody
  timeoutMs: number
}): Promise<Uint8Array> {
  let r: Response
  try {
    const init: RequestInit & { timeout: boolean } = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer x" },
      body: JSON.stringify(args.body),
      timeout: false,
      signal: AbortSignal.timeout(args.timeoutMs),
    }
    r = await fetch(`${args.baseUrl}/v1/images/generations`, init)
  } catch (err) {
    const name = err instanceof Error ? err.name : ""
    if (name === "TimeoutError" || name === "AbortError") {
      throw new OperationalError(poolTimeoutMessage("generation", args.timeoutMs))
    }
    throw err
  }
  if (!r.ok) {
    throw new OperationalError(`generation failed: ${r.status} ${await r.text()}`)
  }
  return decodeFirstPng(ImageResponseSchema.parse(await r.json()))
}
