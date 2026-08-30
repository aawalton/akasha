import ts from "typescript"
import { parsedAs } from "../../code-system/code-source/code-source.module.code.ts"
import { generatedProperties } from "../../pages-system/indexes/generated-properties/generated-properties.module.code.ts"
import {
  loadedFrom,
  pageTypesIn,
} from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { pageNamed } from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { type Shadow, shadowFor } from "../../pages-system/shadow/shadow.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"
import { baseOf, changeOf } from "../landing/landing.module.code.ts"

const UUID_V7 = "uuid-v7"

const STAMPED = 6

const OVER = 256

export type Filled = {
  readonly path: string
  readonly keys: readonly string[]
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

export function earlyOf(shadow: Shadow): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [slug, one] of generatedProperties(shadow)) {
    if (!one.afterChecks) found.set(slug, one.kind)
  }
  return found
}

export function earlyIn(root: string, changes: readonly FileEdit[]): ReadonlyMap<string, string> {
  const cast = shadowFor(changeOf(root, { base: baseOf(root), edits: changes }))
  if ("refused" in cast) return new Map()
  return earlyOf(cast.shadow)
}

export function mintingOnto(root: string, changes: readonly FileEdit[]): Minted {
  const change = changeOf(root, { base: baseOf(root), edits: changes })
  const cast = shadowFor(change)
  if ("refused" in cast) return { changes, filled: [] }
  const early = earlyOf(cast.shadow)
  if (early.size === 0) return { changes, filled: [] }
  const pageTypes = pageTypesIn(cast.shadow.reading)
  const held: FileEdit[] = []
  const filled: Filled[] = []
  for (const one of changes) {
    const body = one.body
    const standing =
      body === null ||
      one.carried === true ||
      !pageNamed(one.path, pageTypes) ||
      change.before(one.path) !== null
    if (standing) {
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
    for (const [slug, kind] of early) {
      const key = exportedAs(slug)
      if (value[key] !== undefined) continue
      const next = insertedInto(one.path, text, key, mintedFor(kind, slug))
      if (next === null) continue
      text = next
      keys.push(key)
    }
    if (keys.length === 0) {
      held.push(one)
      continue
    }
    held.push({ ...one, body: new TextEncoder().encode(text) })
    filled.push({ path: one.path, keys })
  }
  return { changes: held, filled }
}
