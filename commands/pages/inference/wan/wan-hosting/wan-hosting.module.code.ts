import { homedir } from "node:os"
import { join } from "node:path"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const DEFAULT_PORT = "8676"

export function portIn(): string {
  return optionalEnv("WAN_PORT") ?? DEFAULT_PORT
}

export function homeIn(): string {
  return optionalEnv("WAN_HOME") ?? join(homedir(), ".local", "share", "wan")
}

export function imageIn(): string {
  return optionalEnv("WAN_IMAGE") ?? "wan:local"
}

export function spawned(
  command: readonly string[]
): Bun.Subprocess<"ignore", "pipe", "pipe"> | null {
  try {
    return Bun.spawn([...command], { stdout: "pipe", stderr: "pipe" })
  } catch {
    return null
  }
}

async function probed(command: readonly string[]): Promise<{ out: string } | { why: string }> {
  const proc = spawned(["ffprobe", ...command])
  if (proc === null) return { why: "ffprobe is not on PATH — install ffmpeg" }
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { why: `ffprobe would not read it — ${last}` }
  }
  return { out: out.trim() }
}

export async function framesIn(path: string): Promise<{ many: number } | { why: string }> {
  const said = await probed([
    "-v",
    "error",
    "-count_frames",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=nb_read_frames",
    "-of",
    "csv=p=0",
    path,
  ])
  if ("why" in said) return said
  const many = Number.parseInt(said.out.split(/\r?\n/)[0]?.trim() ?? "", 10)
  if (!Number.isInteger(many) || many <= 0) {
    return { why: `ffprobe answered \`${said.out}\` for the frames in \`${path}\`` }
  }
  return { many }
}

export async function sizeIn(
  path: string
): Promise<{ width: number; height: number } | { readonly why: string }> {
  const said = await probed([
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "csv=p=0",
    path,
  ])
  if ("why" in said) return said
  const [w, h] = (said.out.split(/\r?\n/)[0]?.trim() ?? "").split(",")
  const width = Number.parseInt(w ?? "", 10)
  const height = Number.parseInt(h ?? "", 10)
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    return { why: `ffprobe answered \`${said.out}\` for the size of \`${path}\`` }
  }
  return { width, height }
}
