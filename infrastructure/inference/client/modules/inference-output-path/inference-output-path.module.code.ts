import { mkdir, readdir, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, dirname, join } from "node:path"
import { errnoCodeOf } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"

const NUMBERED = /^(\d{3,})-/

const NUMBER_WIDTH = 3

const TAKEN_ALREADY = "EEXIST"

type OutputOperation =
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

export function highestNumberIn(names: readonly string[]): number {
  return names.reduce((highest, name) => {
    const held = NUMBERED.exec(name)?.[1]
    return held === undefined ? highest : Math.max(highest, Number(held))
  }, 0)
}

export function numberedName(name: string, number: number): string {
  if (NUMBERED.test(name)) return name
  return `${String(number).padStart(NUMBER_WIDTH, "0")}-${name}`
}

async function writtenFrom(
  folder: string,
  name: string,
  number: number,
  bytes: Uint8Array
): Promise<string> {
  const path = join(folder, numberedName(name, number))
  try {
    await writeFile(path, bytes, { flag: NUMBERED.test(name) ? "w" : "wx" })
    return path
  } catch (err) {
    if (errnoCodeOf(err) !== TAKEN_ALREADY) throw err
    return await writtenFrom(folder, name, number + 1, bytes)
  }
}

export async function writeNumbered(outputPath: string, bytes: Uint8Array): Promise<string> {
  const folder = dirname(outputPath)
  await mkdir(folder, { recursive: true })
  const next = highestNumberIn(await readdir(folder)) + 1
  return await writtenFrom(folder, basename(outputPath), next, bytes)
}
