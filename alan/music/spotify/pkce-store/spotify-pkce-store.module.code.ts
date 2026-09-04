import { z } from "zod"
import {
  cachePathOf,
  readCacheFile,
  removeCacheFile,
  writeCacheFile,
} from "../cache-file/spotify-cache-file.module.code.ts"

const FILE_NAME = "pkce.json"

const NAMED = "PKCE handoff"

export const PkceHandoffSchema = z
  .object({
    verifier: z.string().min(1),
    state: z.string().min(1),
  })
  .strict()

export type PkceHandoff = z.infer<typeof PkceHandoffSchema>

export function getPkceFilePath(baseDir?: string): string {
  return cachePathOf(FILE_NAME, process.env.SPOTIFY_PKCE_FILE, baseDir)
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
