import { spawn } from "node:child_process"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

export const MLX_VLM_MODEL = "mlx-community/Qwen3-VL-30B-A3B-Instruct-4bit"
export const DEFAULT_FRAMES = 16
export const VIDEO_QA_MAX_TOKENS = 1024

export function selectFrameIndices(total: number, want: number): readonly number[] {
  if (total <= 0 || want <= 0) return []
  if (want >= total) return Array.from({ length: total }, (_, i) => i)
  if (want === 1) return [Math.floor((total - 1) / 2)]
  const out: number[] = []
  for (let i = 0; i < want; i++) {
    out.push(Math.round((i * (total - 1)) / (want - 1)))
  }
  return out
}

export function buildFrameExtractArgs(input: {
  videoPath: string
  outDir: string
  fps?: number
}): readonly string[] {
  const out = ["-y", "-i", input.videoPath]
  if (input.fps !== undefined) out.push("-vf", `fps=${input.fps}`)
  out.push("-vsync", "0", `${input.outDir}/frame_%05d.png`)
  return out
}

export function toPngDataUrl(bytes: Uint8Array): string {
  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`
}

export interface VideoQaImagePart {
  readonly type: "image_url"
  readonly image_url: { readonly url: string }
}
export interface VideoQaTextPart {
  readonly type: "text"
  readonly text: string
}
export type VideoQaContentPart = VideoQaImagePart | VideoQaTextPart

export interface VideoQaMessage {
  readonly role: "user"
  readonly content: readonly VideoQaContentPart[]
}

export interface VideoQaRequest {
  readonly model: string
  readonly messages: readonly [VideoQaMessage]
  readonly max_tokens: number
  readonly temperature: number
}

export function buildVideoQaRequest(input: {
  model: string
  checklist: string
  imageDataUrls: readonly string[]
  maxTokens?: number
}): VideoQaRequest {
  const content: VideoQaContentPart[] = input.imageDataUrls.map((url) => ({
    type: "image_url",
    image_url: { url },
  }))
  content.push({ type: "text", text: input.checklist })
  return {
    model: input.model,
    messages: [{ role: "user", content }],
    max_tokens: input.maxTokens ?? VIDEO_QA_MAX_TOKENS,
    temperature: 0,
  }
}

export function runFfmpeg(args: readonly string[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] })
    let stderr = ""
    child.stderr?.on("data", (c: Buffer) => {
      stderr += c.toString()
    })
    child.on("error", (err: Error & { code?: string }) => {
      reject(
        new OperationalError(
          err.code === "ENOENT" ? "ffmpeg not found on PATH" : `ffmpeg spawn failed: ${err.message}`
        )
      )
    })
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new OperationalError(`ffmpeg exited ${code}: ${stderr.trim()}`))
    })
  })
}

const ChatResponseSchema = z.object({
  choices: z.array(z.object({ message: z.object({ content: z.string() }) })).min(1),
})

export async function runVideoQa(args: {
  baseUrl: string
  body: VideoQaRequest
  timeoutMs: number
}): Promise<string> {
  const r = await fetch(`${args.baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer x" },
    body: JSON.stringify(args.body),
    signal: AbortSignal.timeout(args.timeoutMs),
  })
  if (!r.ok) {
    throw new OperationalError(`video-qa failed: ${r.status} ${await r.text()}`)
  }
  const parsed = ChatResponseSchema.parse(await r.json())
  const first = parsed.choices[0]
  if (first === undefined) throw new OperationalError("video-qa response had no choices")
  return first.message.content
}
