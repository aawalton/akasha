import { extname } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"

export type SegmentOutput = "matte" | "cutout" | "flatten"

export interface SegmentFieldsInput {
  readonly output: SegmentOutput
  readonly model: string
  readonly alphaMatting: boolean
  readonly bgColor?: string
}

export function buildSegmentFields(input: SegmentFieldsInput): Readonly<Record<string, string>> {
  return {
    output: input.output,
    model: input.model,
    alpha_matting: input.alphaMatting ? "true" : "false",
    ...(input.bgColor !== undefined ? { bgcolor: input.bgColor } : {}),
  }
}

export function deriveSiblingPath(mattePath: string, suffix: string): string {
  const ext = extname(mattePath)
  const stem = ext === "" ? mattePath : mattePath.slice(0, -ext.length)
  return `${stem}-${suffix}${ext === "" ? ".png" : ext}`
}

export interface RunSegmentInput {
  readonly baseUrl: string
  readonly imageBytes: Uint8Array
  readonly fields: Readonly<Record<string, string>>
  readonly timeoutMs: number
}

export async function runSegment(input: RunSegmentInput): Promise<Uint8Array> {
  const form = new FormData()
  for (const [key, value] of Object.entries(input.fields)) {
    form.append(key, value)
  }
  const buf = new Uint8Array(input.imageBytes.byteLength)
  buf.set(input.imageBytes)
  form.append("image", new Blob([buf], { type: "image/png" }), "input.png")

  let response: Response
  try {
    response = await fetch(`${input.baseUrl}/segment`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(input.timeoutMs),
    })
  } catch (err) {
    throw new OperationalError(`segment request to ${input.baseUrl} failed: ${String(err)}`)
  }
  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new OperationalError(`segment service returned ${response.status}: ${detail.trim()}`)
  }
  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.includes("image/png")) {
    throw new OperationalError(`segment service returned non-PNG content-type '${contentType}'`)
  }
  return new Uint8Array(await response.arrayBuffer())
}
