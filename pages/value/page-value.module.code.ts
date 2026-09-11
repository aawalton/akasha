import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

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

const SPINS = 8

const MISREAD =
  "a body compiled as another body's code, and the compiler held to it over eight tries"

function holdsNames(held: Record<string, unknown>, named: readonly string[]): boolean {
  if (Object.keys(held).length !== named.length) return false
  return named.every((one) => Object.hasOwn(held, one))
}

function madeFrom(source: string, spun: number): Record<string, unknown> {
  const said = spun === 0 ? source : `${source}\n//${"/".repeat(spun)}`
  return new Function(said)() as Record<string, unknown>
}

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

export function declaredIn(body: string): Record<string, unknown> {
  const on = transpiler()
  const named = on.scan(body).exports.filter((one) => one !== DEFAULT && NAMED.test(one))
  const js = on.transformSync(body).replace(EXPORTED, "")
  const source = `${js}\nreturn {${named.join(",")}}`
  for (let spun = 0; spun < SPINS; spun += 1) {
    const held = madeFrom(source, spun)
    if (holdsNames(held, named)) return held
  }
  throw new Error(MISREAD)
}

export function loadedFrom(body: string): Loaded {
  try {
    return { value: firstValueIn(declaredIn(body)), failed: null }
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
