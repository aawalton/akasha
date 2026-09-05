import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { extname } from "node:path"
import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta"

export function imageMimeType(path: string): string {
  const ext = extname(path).toLowerCase()
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg"
  if (ext === ".webp") return "image/webp"
  return "image/png"
}

export interface GeminiInlineImage {
  readonly imageBase64: string
  readonly mimeType: string
}

export interface GeminiImageConfig {
  readonly aspectRatio?: string
  readonly imageSize?: string
}

export interface GeminiEditRequestInput {
  readonly prompt: string
  readonly imageBase64: string
  readonly mimeType: string
  readonly referenceImages?: readonly GeminiInlineImage[]
  readonly imageConfig?: GeminiImageConfig
}

export function buildGeminiEditRequest(input: GeminiEditRequestInput): Readonly<{
  contents: readonly unknown[]
  generationConfig: Readonly<{
    responseModalities: readonly string[]
    imageConfig?: GeminiImageConfig
  }>
}> {
  return {
    contents: [
      {
        parts: [
          { text: input.prompt },
          { inlineData: { mimeType: input.mimeType, data: input.imageBase64 } },
          ...(input.referenceImages ?? []).map((ref) => ({
            inlineData: { mimeType: ref.mimeType, data: ref.imageBase64 },
          })),
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      ...(input.imageConfig !== undefined ? { imageConfig: input.imageConfig } : {}),
    },
  }
}

const GeminiResponseSchema = z.object({
  candidates: z
    .array(
      z.object({
        content: z
          .object({
            parts: z
              .array(
                z.object({
                  text: z.string().optional(),
                  inlineData: z.object({ mimeType: z.string(), data: z.string() }).optional(),
                })
              )
              .optional(),
          })
          .optional(),
      })
    )
    .optional(),
})

export function parseGeminiImageResponse(json: unknown): Uint8Array {
  const parsed = GeminiResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new DataError(`unexpected Gemini response shape: ${parsed.error.message}`)
  }
  for (const candidate of parsed.data.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      if (part.inlineData !== undefined && part.inlineData.data.length > 0) {
        return new Uint8Array(Buffer.from(part.inlineData.data, "base64"))
      }
    }
  }
  throw new DataError("Gemini response carried no inline image part")
}

export interface RunGeminiEditInput {
  readonly apiKey: string
  readonly model: string
  readonly imagePath: string
  readonly prompt: string
  readonly timeoutSec: number
  readonly referenceImagePaths?: readonly string[]
  readonly imageConfig?: GeminiImageConfig
}

export async function runGeminiEdit(input: RunGeminiEditInput): Promise<Uint8Array> {
  const bytes = await readFile(input.imagePath)
  const referenceImages: GeminiInlineImage[] = []
  for (const refPath of input.referenceImagePaths ?? []) {
    const refBytes = await readFile(refPath)
    referenceImages.push({
      imageBase64: Buffer.from(refBytes).toString("base64"),
      mimeType: imageMimeType(refPath),
    })
  }
  const body = buildGeminiEditRequest({
    prompt: input.prompt,
    imageBase64: Buffer.from(bytes).toString("base64"),
    mimeType: imageMimeType(input.imagePath),
    ...(referenceImages.length > 0 ? { referenceImages } : {}),
    ...(input.imageConfig !== undefined ? { imageConfig: input.imageConfig } : {}),
  })

  const url = `${GEMINI_BASE_URL}/models/${input.model}:generateContent`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), input.timeoutSec * 1000)
  let res: Response
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": input.apiKey },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
  } catch (err) {
    throw new OperationalError(`Gemini request failed: ${String(err)}`)
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new OperationalError(`Gemini API ${res.status}: ${text.slice(0, 500)}`)
  }
  const json: unknown = await res.json()
  return parseGeminiImageResponse(json)
}

export function imageFormatForPath(path: string): string {
  const ext = extname(path).slice(1).toLowerCase()
  return ext.length > 0 ? ext : "png"
}

export function magickTranscodeArgs(format: string): readonly string[] {
  return ["-", `${format}:-`]
}

export function transcodeImage(bytes: Uint8Array, format: string): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const child = spawn("magick", [...magickTranscodeArgs(format)], {
      stdio: ["pipe", "pipe", "pipe"],
    })
    const out: Buffer[] = []
    let stderr = ""
    child.stdout.on("data", (d: Buffer) => out.push(d))
    child.stderr.on("data", (d: Buffer) => {
      stderr += d.toString()
    })
    child.stdin.on("error", () => {})
    child.on("error", (err: NodeJS.ErrnoException) => {
      reject(
        new OperationalError(
          err.code === "ENOENT"
            ? "ImageMagick `magick` not found on PATH"
            : `magick spawn failed: ${err.message}`
        )
      )
    })
    child.on("close", (code) => {
      if (code === 0) resolve(new Uint8Array(Buffer.concat(out)))
      else reject(new OperationalError(`magick exited ${code ?? -1}: ${stderr.trim()}`))
    })
    child.stdin.write(Buffer.from(bytes))
    child.stdin.end()
  })
}
