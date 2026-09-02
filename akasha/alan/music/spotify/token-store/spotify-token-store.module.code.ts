import { z } from "zod"
import {
  cachePathOf,
  readCacheFile,
  removeCacheFile,
  writeCacheFile,
} from "../cache-file/spotify-cache-file.module.code.ts"

const FILE_NAME = "token.json"

const NAMED = "token"

export const SpotifyTokenSchema = z
  .object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    expiresAt: z.string().min(1),
    scopes: z.array(z.string()).readonly(),
  })
  .strict()

export type SpotifyToken = z.infer<typeof SpotifyTokenSchema>

export function getTokenFilePath(baseDir?: string): string {
  return cachePathOf(FILE_NAME, process.env.SPOTIFY_TOKEN_FILE, baseDir)
}

export function writeToken(token: SpotifyToken, baseDir?: string): undefined {
  writeCacheFile(getTokenFilePath(baseDir), token)
}

export function readToken(baseDir?: string): SpotifyToken | null {
  return readCacheFile(getTokenFilePath(baseDir), SpotifyTokenSchema, NAMED)
}

export function removeToken(baseDir?: string): undefined {
  removeCacheFile(getTokenFilePath(baseDir))
}
