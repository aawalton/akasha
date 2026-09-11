import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

export type Running = {
  readonly dir?: string
  readonly dirname?: string
  readonly url?: string
}

export function dirOfModule(meta: Running): string | undefined {
  const named = meta.dir ?? meta.dirname
  if (named !== undefined) return named
  if (meta.url === undefined) return undefined
  if (typeof fileURLToPath !== "function") return undefined
  return dirname(fileURLToPath(meta.url))
}
