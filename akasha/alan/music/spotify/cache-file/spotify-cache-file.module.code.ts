import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import type { z } from "zod"

const CACHE_FOLDER = "collections-music-spotify"

const OWNER_ONLY = 0o600

function isErrnoException(thrown: unknown): thrown is NodeJS.ErrnoException {
  return thrown instanceof Error && "code" in thrown
}

export function defaultBaseDir(): string {
  return join(homedir(), ".cache", CACHE_FOLDER)
}

export function cachePathOf(
  fileName: string,
  override: string | undefined,
  baseDir?: string
): string {
  if (override !== undefined && override.length > 0) return override
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
    if (isErrnoException(thrown) && thrown.code === "ENOENT") return null
    throw thrown
  }
  let read: unknown
  try {
    read = JSON.parse(raw)
  } catch (thrown) {
    console.error(`[spotify] the ${named} file at ${path} is not valid JSON:`, thrown)
    return null
  }
  const answered = shape.safeParse(read)
  if (!answered.success) {
    console.error(
      `[spotify] the ${named} file at ${path} does not match its shape:`,
      answered.error.issues
    )
    return null
  }
  return answered.data
}

export function removeCacheFile(path: string): undefined {
  try {
    unlinkSync(path)
  } catch (thrown) {
    if (isErrnoException(thrown) && thrown.code === "ENOENT") return
    throw thrown
  }
}
