import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { z } from "zod"

export const PkceHandoffSchema = z
  .object({
    verifier: z.string().min(1),
    state: z.string().min(1),
  })
  .strict()

export type PkceHandoff = z.infer<typeof PkceHandoffSchema>

function isErrnoException(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && "code" in err
}

function defaultBaseDir(): string {
  return join(homedir(), ".cache", "collections-music-spotify")
}

export function getPkceFilePath(baseDir?: string): string {
  const override = z.string().min(1).safeParse(process.env.SPOTIFY_PKCE_FILE)
  if (override.success) return override.data
  const root = baseDir ?? defaultBaseDir()
  return join(root, "pkce.json")
}

export function writePkce(handoff: PkceHandoff, baseDir?: string): undefined {
  const path = getPkceFilePath(baseDir)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(handoff, null, 2)}\n`, { mode: 0o600 })
}

export function readPkce(baseDir?: string): PkceHandoff | null {
  const path = getPkceFilePath(baseDir)
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (err) {
    if (isErrnoException(err) && err.code === "ENOENT") return null
    throw err
  }
  let parseResult: ReturnType<typeof PkceHandoffSchema.safeParse>
  try {
    parseResult = PkceHandoffSchema.safeParse(JSON.parse(raw))
  } catch (err) {
    console.error(`[spotify] PKCE file at ${path} is not valid JSON:`, err)
    return null
  }
  if (!parseResult.success) {
    console.error(`[spotify] PKCE file at ${path} failed schema parse:`, parseResult.error.issues)
    return null
  }
  return parseResult.data
}

export function removePkce(baseDir?: string): undefined {
  const path = getPkceFilePath(baseDir)
  try {
    unlinkSync(path)
  } catch (err) {
    if (isErrnoException(err) && err.code === "ENOENT") return
    throw err
  }
}
