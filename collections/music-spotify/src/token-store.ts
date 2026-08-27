import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { z } from "zod"

export const SpotifyTokenSchema = z
  .object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    expiresAt: z.string().min(1),
    scopes: z.array(z.string()).readonly(),
  })
  .strict()

export type SpotifyToken = z.infer<typeof SpotifyTokenSchema>

function isErrnoException(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && "code" in err
}

function defaultBaseDir(): string {
  return join(homedir(), ".cache", "collections-music-spotify")
}

export function getTokenFilePath(baseDir?: string): string {
  const override = z.string().min(1).safeParse(process.env.SPOTIFY_TOKEN_FILE)
  if (override.success) return override.data
  const root = baseDir ?? defaultBaseDir()
  return join(root, "token.json")
}

export function writeToken(token: SpotifyToken, baseDir?: string): undefined {
  const path = getTokenFilePath(baseDir)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(token, null, 2)}\n`, { mode: 0o600 })
}

export function readToken(baseDir?: string): SpotifyToken | null {
  const path = getTokenFilePath(baseDir)
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (err) {
    if (isErrnoException(err) && err.code === "ENOENT") return null
    throw err
  }
  let parseResult: ReturnType<typeof SpotifyTokenSchema.safeParse>
  try {
    parseResult = SpotifyTokenSchema.safeParse(JSON.parse(raw))
  } catch (err) {
    console.error(`[spotify] token file at ${path} is not valid JSON:`, err)
    return null
  }
  if (!parseResult.success) {
    console.error(`[spotify] token file at ${path} failed schema parse:`, parseResult.error.issues)
    return null
  }
  return parseResult.data
}

export function removeToken(baseDir?: string): undefined {
  const path = getTokenFilePath(baseDir)
  try {
    unlinkSync(path)
  } catch (err) {
    if (isErrnoException(err) && err.code === "ENOENT") return
    throw err
  }
}
