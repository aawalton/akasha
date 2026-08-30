import ts from "typescript"
import type { Leaving } from "../../checks-system/judging/judging.module.code.ts"
import { formattedBody } from "../../code-system/code-format/code-format.module.code.ts"
import { parsedAs } from "../../code-system/code-source/code-source.module.code.ts"
import { generatedProperties } from "../../pages-system/indexes/generated-properties/generated-properties.module.code.ts"
import {
  loadedFrom,
  numberAt,
  pageTypesIn,
  textAt,
} from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { standingAt } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { pageNamed } from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { type Shadow, shadowFor } from "../../pages-system/shadow/shadow.module.code.ts"
import type { Change } from "../landing/landing.module.code.ts"
import { baseOf, leavingOf } from "../landing/landing.module.code.ts"

const UUID_V7 = "uuid-v7"

const NEXT_SEQ_KIND = "next-seq"

const NEXT_SEQ = "nextSeq"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const STAMPED = 6

const OVER = 256

export type Filled = {
  readonly path: string
  readonly keys: readonly string[]
}

export type Minted = {
  readonly changes: readonly Change[]
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

export function earlyIn(root: string, changes: readonly Change[]): ReadonlyMap<string, string> {
  const leaving = leavingOf(root, { base: baseOf(root), changed: changes })
  const cast = shadowFor(leaving)
  if ("refused" in cast) return new Map()
  const found = new Map<string, string>()
  for (const [slug, one] of generatedProperties(cast.shadow)) {
    if (!one.afterChecks) found.set(slug, one.kind)
  }
  return found
}

export function mintingOnto(root: string, changes: readonly Change[]): Minted {
  const early = earlyIn(root, changes)
  if (early.size === 0) return { changes, filled: [] }
  const leaving = leavingOf(root, { base: baseOf(root), changed: changes })
  const pageTypes = pageTypesIn(root)
  const held: Change[] = []
  const filled: Filled[] = []
  for (const one of changes) {
    const body = one.body
    const standing =
      body === null ||
      one.carried === true ||
      !pageNamed(one.path, pageTypes) ||
      leaving.was(one.path) !== null
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

export function numberedIn(path: string, text: string, key: string, said: string): string | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const held = declared.initializer
      if (held === undefined) continue
      const literal = literalOf(held)
      if (literal === null) continue
      for (const one of literal.properties) {
        if (!ts.isPropertyAssignment(one) || one.name.getText(source) !== key) continue
        const at = one.initializer.getStart(source)
        return `${text.slice(0, at)}${said}${text.slice(one.initializer.getEnd())}`
      }
    }
  }
  return null
}

export function countedBy(shadow: Shadow): string | null {
  for (const [slug, one] of generatedProperties(shadow)) {
    if (one.afterChecks && one.kind === NEXT_SEQ_KIND) return slug
  }
  return null
}

export function typePathIn(shadow: Shadow, pageTypeSlug: string): string | null {
  const standing = standingAt(shadow.reading, PAGE_TYPE, pageTypeSlug)
  return standing.length === 1 ? (standing[0]?.path ?? null) : null
}

function textIn(leaving: Leaving, path: string): string | null {
  const bytes = leaving.at(path)
  return bytes === null ? null : new TextDecoder().decode(bytes)
}

function formattedOnto(root: string, path: string, text: string): Uint8Array {
  const bytes = new TextEncoder().encode(text)
  const said = formattedBody(root, path, bytes)
  return said.changed ? said.body : bytes
}

export function countingOnto(leaving: Leaving, changes: readonly Change[]): readonly Change[] {
  const cast = shadowFor(leaving)
  if ("refused" in cast) return changes
  const shadow = cast.shadow
  const slug = countedBy(shadow)
  if (slug === null) return changes
  const key = exportedAs(slug)
  const pageTypes = pageTypesIn(leaving.root)
  const minting = [...changes]
    .sort((here, there) => (here.path < there.path ? -1 : 1))
    .flatMap((one) => {
      if (one.body === null || one.carried === true) return []
      if (!pageNamed(one.path, pageTypes) || leaving.was(one.path) !== null) return []
      const value = loadedFrom(new TextDecoder().decode(one.body)).value
      if (value === null || value[key] !== undefined) return []
      const pageTypeSlug = textAt(value, PAGE_TYPE_SLUG)
      const at = pageTypeSlug === null ? null : typePathIn(shadow, pageTypeSlug)
      return at === null ? [] : [{ at, path: one.path }]
    })
  const taking = Map.groupBy(minting, (one) => one.at)
  if (taking.size === 0) return changes
  const bodies = new Map<string, Uint8Array>()
  for (const [at, paths] of taking) {
    const text = textIn(leaving, at)
    const value = text === null ? null : loadedFrom(text).value
    const from = value === null ? null : numberAt(value, NEXT_SEQ)
    if (text === null || from === null) continue
    let number = from
    for (const one of paths) {
      const held = textIn(leaving, one.path)
      const next = held === null ? null : insertedInto(one.path, held, key, String(number))
      if (next === null) continue
      bodies.set(one.path, formattedOnto(leaving.root, one.path, next))
      number += 1
    }
    if (number === from) continue
    const bumped = numberedIn(at, text, NEXT_SEQ, String(number))
    if (bumped !== null) bodies.set(at, formattedOnto(leaving.root, at, bumped))
  }
  if (bodies.size === 0) return changes
  const held: Change[] = changes.map((one) => {
    const body = bodies.get(one.path)
    return body === undefined ? one : { ...one, body }
  })
  const named = new Set(changes.map((one) => one.path))
  for (const [path, body] of bodies) {
    if (!named.has(path)) held.push({ path, body })
  }
  return held
}
