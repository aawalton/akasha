import { parsedAs } from "@akasha/code-system/code-source"
import type { Generated } from "@akasha/indexes/generated-properties"
import { generatedProperties } from "@akasha/indexes/generated-properties"
import { heldIn, pageNamed } from "@akasha/pages-system/page-file-name"
import { loadedFrom } from "@akasha/pages-system/page-value"
import { type Shadow, shadowFor } from "@akasha/pages-system/shadow"
import ts from "typescript"
import type { FileEdit } from "../landing/landing.module.code.ts"
import { baseOf, changeOf } from "../landing/landing.module.code.ts"

const UUID_V7 = "uuid-v7"

const ID = "id"

const NEW_PAGE = "a page being created states none of its own"

const NEW_ENTRY = "an entry arriving without one is given one"

const STAMPED = 6

const OVER = 256

export type Filled = {
  readonly path: string
  readonly keys: readonly string[]
  readonly why: string
}

export type Minted = {
  readonly changes: readonly FileEdit[]
  readonly filled: readonly Filled[]
}

export function uuidVersion7(at: number = Date.now()): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  let left = at
  for (let one = STAMPED - 1; one >= 0; one -= 1) {
    bytes[one] = left % OVER
    left = Math.floor(left / OVER)
  }
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x70
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const said = [...bytes].map((one) => one.toString(16).padStart(2, "0")).join("")
  return [
    said.slice(0, 8),
    said.slice(8, 12),
    said.slice(12, 16),
    said.slice(16, 20),
    said.slice(20),
  ].join("-")
}

function literalOf(node: ts.Expression): ts.ObjectLiteralExpression | null {
  let held = node
  for (;;) {
    if (ts.isSatisfiesExpression(held) || ts.isAsExpression(held)) {
      held = held.expression
      continue
    }
    return ts.isObjectLiteralExpression(held) ? held : null
  }
}

export function insertedInto(path: string, text: string, key: string, said: string): string | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const held = declared.initializer
      if (held === undefined) continue
      const literal = literalOf(held)
      if (literal === null) continue
      const first = literal.properties[0]
      const at = first === undefined ? literal.getStart(source) + 1 : first.getStart(source)
      return `${text.slice(0, at)}${key}: ${said}, ${text.slice(at)}`
    }
  }
  return null
}

export function mintedFor(kind: string, slug: string): string {
  if (kind === UUID_V7) return JSON.stringify(uuidVersion7())
  throw new Error(
    `\`${slug}\` is worked out by \`${kind}\` before the checks, and nothing here works that kind out`
  )
}

export function earlyOf(shadow: Shadow): ReadonlyMap<string, Generated> {
  const found = new Map<string, Generated>()
  for (const [slug, one] of generatedProperties(shadow)) {
    if (!one.afterChecks) found.set(slug, one)
  }
  return found
}

export function earlyIn(
  root: string,
  changes: readonly FileEdit[]
): ReadonlyMap<string, Generated> {
  const cast = shadowFor(changeOf(root, { base: baseOf(root), edits: changes }))
  if ("refused" in cast) return new Map()
  return earlyOf(cast.shadow)
}

export function identified(line: string): string | null {
  const said = line.trim()
  if (said === "") return null
  let held: unknown
  try {
    held = JSON.parse(said)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const row = held as Record<string, unknown>
  if (typeof row[ID] === "string") return null
  return JSON.stringify({ [ID]: uuidVersion7(), ...row })
}

export function identifiedOver(text: string): string | null {
  const lines = text.split("\n")
  let turned = false
  const said = lines.map((line) => {
    const next = identified(line)
    if (next === null) return line
    turned = true
    return next
  })
  return turned ? said.join("\n") : null
}

function entriedOnto(shadow: Shadow, changes: readonly FileEdit[]): Minted {
  const shapes = shadow.index.entryShapesAt()
  if (shapes.size === 0) return { changes, filled: [] }
  const pageTypes = shadow.index.pageTypesIn()
  const fileProperties = new Set(shadow.index.fileKeysAt().keys())
  const held: FileEdit[] = []
  const filled: Filled[] = []
  for (const one of changes) {
    const body = one.body
    if (body === null || one.carried === true) {
      held.push(one)
      continue
    }
    const said = heldIn(one.path, pageTypes, fileProperties)
    if (said.kind !== "property" || said.propertySlug === null || !shapes.has(said.propertySlug)) {
      held.push(one)
      continue
    }
    const next = identifiedOver(new TextDecoder().decode(body))
    if (next === null) {
      held.push(one)
      continue
    }
    held.push({ ...one, body: new TextEncoder().encode(next) })
    filled.push({ path: one.path, keys: [ID], why: NEW_ENTRY })
  }
  return { changes: held, filled }
}

export function mintingOnto(root: string, changes: readonly FileEdit[]): Minted {
  const change = changeOf(root, { base: baseOf(root), edits: changes })
  const cast = shadowFor(change)
  if ("refused" in cast) return { changes, filled: [] }
  const entried = entriedOnto(cast.shadow, changes)
  const early = earlyOf(cast.shadow)
  if (early.size === 0) return entried
  const pageTypes = cast.shadow.index.pageTypesIn()
  const held: FileEdit[] = []
  const filled: Filled[] = []
  for (const one of entried.changes) {
    const body = one.body
    const leftAlone =
      body === null ||
      one.carried === true ||
      !pageNamed(one.path, pageTypes) ||
      change.before(one.path) !== null
    if (leftAlone) {
      held.push(one)
      continue
    }
    let text = new TextDecoder().decode(body)
    const value = loadedFrom(text).value
    if (value === null) {
      held.push(one)
      continue
    }
    const keys: string[] = []
    for (const [slug, said] of early) {
      if (value[said.key] !== undefined) continue
      const next = insertedInto(one.path, text, said.key, mintedFor(said.kind, slug))
      if (next === null) continue
      text = next
      keys.push(said.key)
    }
    if (keys.length === 0) {
      held.push(one)
      continue
    }
    held.push({ ...one, body: new TextEncoder().encode(text) })
    filled.push({ path: one.path, keys, why: NEW_PAGE })
  }
  return { changes: held, filled: [...entried.filled, ...filled] }
}
