import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { addressIn } from "../address/page-address.module.code.ts"

function newTranspiler() {
  return new Bun.Transpiler({ loader: "ts" })
}

const NO_TRANSPILER =
  "a page body is loaded with `Bun.Transpiler`, which only bun carries, and this runtime holds no " +
  "`Bun` global, so what every body here holds is unknown rather than nothing"

let transpilerHeld: ReturnType<typeof newTranspiler> | null = null

function transpiler(): ReturnType<typeof newTranspiler> {
  if (typeof Bun === "undefined") throw new Error(NO_TRANSPILER)
  transpilerHeld ??= newTranspiler()
  return transpilerHeld
}

const EXPORTED = /^export\s+/gm

const NAMED = /^[A-Za-z_$][\w$]*$/

const DEFAULT = "default"

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
  const on = transpiler()
  try {
    const named = on.scan(body).exports.filter((one) => one !== DEFAULT && NAMED.test(one))
    const js = on.transformSync(body).replace(EXPORTED, "")
    const declared = new Function(`${js}\nreturn {${named.join(",")}}`)() as Record<string, unknown>
    return { value: firstValueIn(declared), failed: null }
  } catch (why) {
    return { value: null, failed: why instanceof Error ? why.message : String(why) }
  }
}

export function valueIn(body: string): Value | null {
  return loadedFrom(body).value
}

export function valuesOver(
  textOf: (path: string) => string | null
): (path: string) => Value | null {
  return (path) => {
    const text = textOf(path)
    return text === null ? null : valueIn(text)
  }
}

export function valueAt(path: string, repo: string): Value | null {
  const at = isAbsolute(path) ? path : join(repo, path)
  const entry = statSync(at, { throwIfNoEntry: false })
  if (entry === undefined || !entry.isFile()) return null
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

export function textsAt(value: Value, key: string): readonly string[] | null {
  const held = value[key]
  if (!Array.isArray(held)) return null
  return held.every((one) => typeof one === "string") ? (held as readonly string[]) : null
}

export function numberAt(value: Value, key: string): number | null {
  const held = value[key]
  return typeof held === "number" ? held : null
}

export function slugAt(value: Value, key: string): string | null {
  const named = textAt(value, key)
  return named === null ? null : slugOf(named)
}

export function slugsIn(said: unknown): readonly string[] {
  if (typeof said === "string") return said === "" ? [] : [slugOf(said)]
  if (!Array.isArray(said)) return []
  const named: string[] = []
  for (const one of said) {
    if (typeof one === "string" && one !== "") named.push(slugOf(one))
  }
  return named
}
