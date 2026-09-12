import {
  cachePathOf,
  parseCacheOverride,
  readCacheFile,
  removeCacheFile,
  writeCacheFile,
} from "akasha/alan/music/spotify/cache-file/spotify-cache-file.module.code.ts"
import { z } from "zod"

const FILE_NAME = "pkce.json"

const NAMED = "PKCE handoff"

const PkceHandoffSchema = z
  .object({
    verifier: z.string().min(1),
  })
  .strict()

export type PkceHandoff = z.infer<typeof PkceHandoffSchema>

export function getPkceFilePath(baseDir?: string): string {
  const override = parseCacheOverride(process.env.SPOTIFY_PKCE_FILE)
  return cachePathOf(FILE_NAME, override, baseDir)
}

export function writePkce(handoff: PkceHandoff, baseDir?: string): undefined {
  writeCacheFile(getPkceFilePath(baseDir), handoff)
}

export function readPkce(baseDir?: string): PkceHandoff | null {
  return readCacheFile(getPkceFilePath(baseDir), PkceHandoffSchema, NAMED)
}

export function removePkce(baseDir?: string): undefined {
  removeCacheFile(getPkceFilePath(baseDir))
}
