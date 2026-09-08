import { stat } from "node:fs/promises"
import { join } from "node:path"

export const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable"

export const SHORT_CACHE_CONTROL = "public, max-age=3600"

export const NO_STORE_CACHE_CONTROL = "no-store"

export const HTML_DEFAULT_CACHE_CONTROL = "private, no-store"

async function serveFile(path: string, cacheControl: string): Promise<Response | null> {
  const file = Bun.file(path)
  if (!(await file.exists())) return null
  return new Response(file, {
    headers: { "Cache-Control": cacheControl },
  })
}

async function isFile(path: string): Promise<boolean> {
  try {
    const s = await stat(path)
    return s.isFile()
  } catch {
    return false
  }
}

export async function serveClientStatic(
  pathname: string,
  clientDir: string
): Promise<Response | null> {
  if (pathname.startsWith("/assets/")) {
    const hit = await serveFile(join(clientDir, pathname), IMMUTABLE_CACHE_CONTROL)
    if (hit) return hit
    return new Response(null, {
      status: 404,
      headers: { "Cache-Control": NO_STORE_CACHE_CONTROL },
    })
  }

  if (pathname !== "/" && (await isFile(join(clientDir, pathname)))) {
    return serveFile(join(clientDir, pathname), SHORT_CACHE_CONTROL)
  }

  return null
}

export function htmlCacheControl(existing: string | null): string {
  return existing ?? HTML_DEFAULT_CACHE_CONTROL
}
