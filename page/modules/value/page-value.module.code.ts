import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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

const EXPORT = "export "

const NEWLINE_EXPORT = "\nexport "

const EXPORT_CONST = "export const "

const EXPORT_TYPE = "export type "

const AS = "as "

const SATISFIES = "satisfies "

const TRUE = "true"

const FALSE = "false"

const NULL = "null"

const SPACE = 32
const TAB = 9
const RETURN = 13
const FEED = 10
const QUOTE = 34
const TICK = 39
const BACKSLASH = 92
const OPEN_BRACE = 123
const CLOSE_BRACE = 125
const OPEN_BRACKET = 91
const CLOSE_BRACKET = 93
const COLON = 58
const COMMA = 44
const PLUS = 43
const MINUS = 45
const DOT = 46
const EQUALS = 61
const SEMICOLON = 59
const ZERO = 48
const NINE = 57
const UPPER_A = 65
const UPPER_Z = 90
const LOWER_A = 97
const LOWER_Z = 122
const UNDERSCORE = 95
const DOLLAR = 36

const HEX = 16

let walking = ""

let cursor = 0

let reading = true

function refusing(): undefined {
  reading = false
}

function refusingText(): string {
  refusing()
  return ""
}

function skipping(): undefined {
  while (cursor < walking.length) {
    const one = walking.charCodeAt(cursor)
    if (one !== SPACE && one !== FEED && one !== TAB && one !== RETURN) return
    cursor += 1
  }
}

function worded(one: number): boolean {
  return (
    (one >= LOWER_A && one <= LOWER_Z) ||
    (one >= UPPER_A && one <= UPPER_Z) ||
    (one >= ZERO && one <= NINE) ||
    one === UNDERSCORE ||
    one === DOLLAR
  )
}

function unescaped(raw: string): string {
  let made = ""
  let from = 0
  while (from < raw.length) {
    const slash = raw.indexOf("\\", from)
    if (slash < 0) return made + raw.slice(from)
    made += raw.slice(from, slash)
    const one = raw[slash + 1]
    from = slash + 2
    if (one === "n") made += "\n"
    else if (one === "t") made += "\t"
    else if (one === "r") made += "\r"
    else if (one === "b") made += "\b"
    else if (one === "f") made += "\f"
    else if (one === "v") made += "\v"
    else if (one === "0") made += "\0"
    else if (one === "x") {
      made += String.fromCodePoint(Number.parseInt(raw.slice(from, from + 2), HEX))
      from += 2
    } else if (one === "u" && raw[from] === "{") {
      const shut = raw.indexOf("}", from)
      if (shut < 0) return refusingText()
      made += String.fromCodePoint(Number.parseInt(raw.slice(from + 1, shut), HEX))
      from = shut + 1
    } else if (one === "u") {
      made += String.fromCharCode(Number.parseInt(raw.slice(from, from + 4), HEX))
      from += 4
    } else if (one === undefined) return refusingText()
    else made += one
  }
  return made
}

function textHere(quote: number): string {
  cursor += 1
  const from = cursor
  let escaped = false
  while (cursor < walking.length) {
    const one = walking.charCodeAt(cursor)
    if (one === BACKSLASH) {
      escaped = true
      cursor += 2
      continue
    }
    if (one === quote) {
      const raw = walking.slice(from, cursor)
      cursor += 1
      return escaped ? unescaped(raw) : raw
    }
    if (one === FEED) break
    cursor += 1
  }
  return refusingText()
}

function joinedFrom(first: string): string {
  const back = cursor
  skipping()
  if (walking.charCodeAt(cursor) !== PLUS) {
    cursor = back
    return first
  }
  let made = first
  while (reading && walking.charCodeAt(cursor) === PLUS) {
    cursor += 1
    skipping()
    const one = walking.charCodeAt(cursor)
    if (one !== QUOTE && one !== TICK) return refusingText()
    made += textHere(one)
    skipping()
  }
  return made
}

function numberHere(): number {
  let sign = 1
  if (walking.charCodeAt(cursor) === MINUS) {
    cursor += 1
    sign = -1
    skipping()
  }
  const from = cursor
  while (cursor < walking.length) {
    const one = walking.charCodeAt(cursor)
    if ((one >= ZERO && one <= NINE) || one === DOT) {
      cursor += 1
      continue
    }
    break
  }
  if (cursor === from) {
    refusing()
    return 0
  }
  return sign * Number(walking.slice(from, cursor))
}

function keyHere(): string {
  const one = walking.charCodeAt(cursor)
  if (one === QUOTE || one === TICK) return textHere(one)
  const from = cursor
  while (cursor < walking.length && worded(walking.charCodeAt(cursor))) cursor += 1
  if (cursor === from) return refusingText()
  return walking.slice(from, cursor)
}

function listHere(): readonly unknown[] {
  cursor += 1
  const made: unknown[] = []
  skipping()
  while (reading && cursor < walking.length) {
    if (walking.charCodeAt(cursor) === CLOSE_BRACKET) {
      cursor += 1
      return made
    }
    made.push(valueHere())
    if (!reading) break
    skipping()
    if (walking.charCodeAt(cursor) === COMMA) {
      cursor += 1
      skipping()
    }
  }
  refusing()
  return made
}

function mapHere(): Value {
  cursor += 1
  const made: Value = {}
  skipping()
  while (reading && cursor < walking.length) {
    if (walking.charCodeAt(cursor) === CLOSE_BRACE) {
      cursor += 1
      return made
    }
    const key = keyHere()
    if (!reading) break
    skipping()
    if (walking.charCodeAt(cursor) !== COLON) break
    cursor += 1
    skipping()
    const under = valueHere()
    if (!reading) break
    made[key] = under
    skipping()
    if (walking.charCodeAt(cursor) === COMMA) {
      cursor += 1
      skipping()
    }
  }
  refusing()
  return made
}

function valueHere(): unknown {
  const one = walking.charCodeAt(cursor)
  if (one === QUOTE || one === TICK) return joinedFrom(textHere(one))
  if (one === OPEN_BRACE) return mapHere()
  if (one === OPEN_BRACKET) return listHere()
  if (one === MINUS || (one >= ZERO && one <= NINE)) return numberHere()
  if (walking.startsWith(TRUE, cursor)) {
    cursor += TRUE.length
    return true
  }
  if (walking.startsWith(FALSE, cursor)) {
    cursor += FALSE.length
    return false
  }
  if (walking.startsWith(NULL, cursor)) {
    cursor += NULL.length
    return null
  }
  refusing()
  return null
}

function tailed(): boolean {
  skipping()
  if (cursor >= walking.length) return true
  if (walking.charCodeAt(cursor) === SEMICOLON) return true
  return walking.startsWith(AS, cursor) || walking.startsWith(SATISFIES, cursor)
}

function openingIn(body: string): number {
  let opens = -1
  let from = body.startsWith(EXPORT) ? 0 : -1
  let more = true
  while (more) {
    if (from >= 0 && !body.startsWith(EXPORT_TYPE, from)) {
      if (opens >= 0) return -1
      opens = from
    }
    const next = body.indexOf(NEWLINE_EXPORT, from < 0 ? 0 : from)
    if (next < 0) more = false
    else from = next + 1
  }
  return opens
}

export function parsedIn(body: string): Value | null {
  const opens = openingIn(body)
  if (opens < 0 || !body.startsWith(EXPORT_CONST, opens)) return null
  walking = body
  cursor = opens + EXPORT_CONST.length
  reading = true
  skipping()
  while (cursor < walking.length && worded(walking.charCodeAt(cursor))) cursor += 1
  skipping()
  if (walking.charCodeAt(cursor) !== EQUALS) return null
  cursor += 1
  skipping()
  if (walking.charCodeAt(cursor) !== OPEN_BRACE) return null
  const value = mapHere()
  if (!reading || !tailed()) return null
  return value
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

function loading(body: string): Loaded {
  const parsed = parsedIn(body)
  if (parsed !== null) return { value: parsed, failed: null }
  try {
    return { value: firstValueIn(declaredIn(body)), failed: null }
  } catch (why) {
    return { value: null, failed: why instanceof Error ? why.message : String(why) }
  }
}

const KEPT = 4000

const LOADED = new Map<string, Loaded>()

export function loadedFrom(body: string): Loaded {
  const held = LOADED.get(body)
  if (held !== undefined) return held
  const made = loading(body)
  if (LOADED.size >= KEPT) LOADED.clear()
  LOADED.set(body, made)
  return made
}

export function valueIn(body: string): Value | null {
  return loadedFrom(body).value
}

export function valueAt(path: string, repo: string): Value | null {
  const at = isAbsolute(path) ? path : join(repo, path)
  const entry = statSync(at, { throwIfNoEntry: false })
  if (entry === undefined || !entry.isFile()) return null
  return loadedFrom(readFileSync(at, "utf8")).value
}

export function textUnder(root: string, path: string, key: string): string | null {
  const value = valueAt(path, root)
  return value === null ? null : textAt(value, key)
}
