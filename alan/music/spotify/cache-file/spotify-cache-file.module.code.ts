import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { errnoCodeOf } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"
import type { z } from "zod"

const CACHE_FOLDER = "music-spotify"

const OWNER_ONLY = 0o600

export function defaultBaseDir(): string {
  return join(homedir(), ".cache", CACHE_FOLDER)
}

export function parseCacheOverride(raw: string | undefined): string | undefined {
  if (raw === undefined || raw.length === 0) return undefined
  return raw
}

export function cachePathOf(
  fileName: string,
  override: string | undefined,
  baseDir?: string
): string {
  if (override !== undefined) return override
  return join(baseDir ?? defaultBaseDir(), fileName)
}

export function writeCacheFile(path: string, held: unknown): undefined {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(held, null, 2)}\n`, { mode: OWNER_ONLY })
}

export function readCacheFile<T extends z.ZodTypeAny>(
  path: string,
  shape: T,
  named: string
): z.infer<T> | null {
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (thrown) {
    if (errnoCodeOf(thrown) === "ENOENT") return null
    throw thrown
  }
  try {
    const answered = shape.safeParse(JSON.parse(raw))
    if (!answered.success) {
      console.error(
        `[spotify] the ${named} file at ${path} does not match its shape:`,
        answered.error.issues
      )
      return null
    }
    return answered.data
  } catch (thrown) {
    console.error(`[spotify] the ${named} file at ${path} is not valid JSON:`, thrown)
    return null
  }
}

export function removeCacheFile(path: string): undefined {
  try {
    unlinkSync(path)
  } catch (thrown) {
    if (errnoCodeOf(thrown) === "ENOENT") return
    throw thrown
  }
}
