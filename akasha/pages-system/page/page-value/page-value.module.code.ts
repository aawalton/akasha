import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { isAbsolute, join } from "node:path"
import { addressIn } from "../page-address/page-address.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const loadFrom = createRequire(import.meta.url)

export type Value = Record<string, unknown>

function firstValueIn(declared: Record<string, unknown>): Value | null {
  for (const one of Object.values(declared)) {
    if (one !== null && typeof one === "object" && !Array.isArray(one)) return one as Value
  }
  return null
}

export type Loaded = {
  readonly value: Value | null
  readonly failed: string | null
}

export function loadedFrom(body: string): Loaded {
  const held = mkdtempSync(join(SCRATCH_AT, "akasha-index-"))
  try {
    const at = join(held, "held.page.ts")
    writeFileSync(at, body)
    return { value: firstValueIn(loadFrom(at) as Record<string, unknown>), failed: null }
  } catch (why) {
    return { value: null, failed: why instanceof Error ? why.message : String(why) }
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export function valueIn(body: string): Value | null {
  return loadedFrom(body).value
}

export function valueAt(path: string, repo: string): Value | null {
  const at = isAbsolute(path) ? path : join(repo, path)
  const stood = statSync(at, { throwIfNoEntry: false })
  if (stood === undefined || !stood.isFile()) return null
  return loadedFrom(readFileSync(at, "utf8")).value
}

export function slugOf(named: string): string {
  const address = addressIn(named)
  return address.kind === "id" ? named : address.slug
}

export function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

export function numberAt(value: Value, key: string): number | null {
  const held = value[key]
  return typeof held === "number" ? held : null
}

export function slugAt(value: Value, key: string): string | null {
  const named = textAt(value, key)
  return named === null ? null : slugOf(named)
}
