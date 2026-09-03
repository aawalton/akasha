import { mkdir } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"

export type OutputOperation =
  | "generate"
  | "edit"
  | "fill"
  | "upscale"
  | "voice-design"
  | "voice-clone"
  | "music"
  | "segment"

export function resolveOutputPath(
  operation: OutputOperation,
  explicit: string | undefined,
  nowMs: number
): string {
  if (explicit !== undefined) return explicit
  const stamp = Math.floor(nowMs / 1000)
  if (operation === "music") {
    return join(homedir(), "Music", "Generated", `${operation}-${stamp}.wav`)
  }
  const ext = operation === "voice-design" || operation === "voice-clone" ? "wav" : "png"
  return join(homedir(), "Pictures", "Generated", `${operation}-${stamp}.${ext}`)
}

export async function ensureOutputDir(outputPath: string): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true })
}
