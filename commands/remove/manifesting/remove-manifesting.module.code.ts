import { dirname } from "node:path"
import ts from "typescript"
import { counted, type Held, textOf } from "../../../command-system/asking/asking.module.code.ts"
import { bodyAt } from "../../../command-system/commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"
import { listEntrySpan, type Span } from "../workspacing/remove-workspacing.module.code.ts"

const MANIFEST = "package.json"

const EXPORTS = "exports"

const HERE = "."

const PARTED_BY = "/"

const OPENING = "./"

export const WAY_IN_SPELLING =
  `a way in under \`${EXPORTS}\` is dropped where the removal takes the file that way in lands ` +
  "on, since a way in naming no file refuses every later landing, so one whose file stays is " +
  "left where it is"

function manifestAt(dir: string): string {
  return dir === HERE ? MANIFEST : `${dir}${PARTED_BY}${MANIFEST}`
}

export function manifestsAbove(
  going: ReadonlySet<string>,
  there: (path: string) => boolean
): readonly string[] {
  const found = new Set<string>()
  for (const path of going) {
    let dir = dirname(path)
    for (;;) {
      const at = manifestAt(dir)
      if (!going.has(at) && !found.has(at) && there(at)) found.add(at)
      if (dir === HERE) break
      dir = dirname(dir)
    }
  }
  return [...found].sort()
}

function objectAt(source: ts.JsonSourceFile, key: string): ts.ObjectLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  if (!ts.isObjectLiteralExpression(held)) return null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== key) continue
    return ts.isObjectLiteralExpression(one.initializer) ? one.initializer : null
  }
  return null
}

export function landsOn(at: string, value: string): string {
  const folder = dirname(at)
  const said = value.startsWith(OPENING) ? value.slice(OPENING.length) : value
  return folder === HERE ? said : `${folder}${PARTED_BY}${said}`
}

export function waysGoneIn(
  at: string,
  text: string,
  going: ReadonlySet<string>
): readonly string[] {
  const source = ts.parseJsonText(at, text)
  const held = objectAt(source, EXPORTS)
  if (held === null) return []
  const found: string[] = []
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    const value = one.initializer
    if (!ts.isStringLiteral(value)) continue
    if (going.has(landsOn(at, value.text))) found.push(one.name.text)
  }
  return found
}

export function withoutWaysIn(at: string, text: string, dropping: ReadonlySet<string>): string {
  const source = ts.parseJsonText(at, text)
  const held = objectAt(source, EXPORTS)
  if (held === null) return text
  const spans: Span[] = []
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (dropping.has(one.name.text)) spans.push(listEntrySpan(text, one))
  }
  let body = text
  for (const one of [...spans].sort((first, next) => next.start - first.start)) {
    body = `${body.slice(0, one.start)}${body.slice(one.end)}`
  }
  return body
}

export type Dropped = { readonly at: string; readonly ways: readonly string[] }

export type Manifesting = {
  readonly edits: readonly FileEdit[]
  readonly unmoved: readonly Held[]
  readonly dropped: readonly Dropped[]
  readonly why: string | null
}

export const NO_MANIFESTING: Manifesting = { edits: [], unmoved: [], dropped: [], why: null }

export function manifestingOver(
  root: string,
  base: string,
  going: ReadonlySet<string>
): Manifesting {
  const edits: FileEdit[] = []
  const unmoved: Held[] = []
  const dropped: Dropped[] = []
  for (const at of manifestsAbove(going, (path) => bodyAt(root, base, path) !== null)) {
    const bytes = bodyAt(root, base, at)
    if (bytes === null) continue
    const text = textOf(bytes)
    if (text === null) continue
    const ways = waysGoneIn(at, text, going)
    if (ways.length === 0) continue
    const mended = withoutWaysIn(at, text, new Set(ways))
    if (mended === text) continue
    edits.push({ path: at, body: new TextEncoder().encode(mended) })
    unmoved.push({ path: at, was: bytes })
    dropped.push({ at, ways: [...ways].sort() })
  }
  return { edits, unmoved, dropped, why: null }
}

export function manifestingFor(
  root: string,
  base: string,
  going: ReadonlySet<string>
): Manifesting {
  try {
    return manifestingOver(root, base, going)
  } catch (thrown) {
    return {
      edits: [],
      unmoved: [],
      dropped: [],
      why:
        `no ${MANIFEST} above what goes could be read at ${base}, so no way in was dropped and ` +
        `the removal went ahead alone — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
    }
  }
}

export function manifestingSaid(held: Manifesting): readonly string[] {
  if (held.why !== null) return [held.why]
  if (held.dropped.length === 0) return []
  return [
    ...held.dropped.map(
      (one) =>
        `${one.at} stopped naming ${counted(one.ways.length, "way in")} this removal empties — ` +
        one.ways.map((way) => `\`${way}\``).join(", ")
    ),
    WAY_IN_SPELLING,
  ]
}
