import ts from "typescript"
import { counted, type Held, textOf } from "../../../command-system/asking/asking.module.code.ts"
import { bodyAt } from "../../../command-system/commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"

const MANIFEST = "package.json"

const WORKSPACES = "workspaces"

const PARTED_BY = "/"

export const WORKSPACE_SPELLING =
  `an entry under \`${WORKSPACES}\` is emptied where the removal takes the \`${MANIFEST}\` that ` +
  "entry names, since a workspace is reached by its manifest, so an entry whose manifest stays " +
  "is left where it is"

export function workspacesIn(text: string): readonly string[] | null {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const held = (read as Record<string, unknown>)[WORKSPACES]
  if (!Array.isArray(held)) return null
  return held.filter((one): one is string => typeof one === "string")
}

export function emptiedBy(named: readonly string[], going: ReadonlySet<string>): readonly string[] {
  return named.filter((one) => going.has(`${one}${PARTED_BY}${MANIFEST}`))
}

export type Span = { readonly start: number; readonly end: number }

export function listEntrySpan(text: string, node: ts.Node): Span {
  const start = node.getFullStart()
  let end = node.getEnd()
  let at = end
  while (at < text.length) {
    const here = text[at]
    if (here === ",") {
      end = at + 1
      break
    }
    if (here !== " " && here !== "\t" && here !== "\r" && here !== "\n") break
    at = at + 1
  }
  return { start, end }
}

function listedIn(source: ts.JsonSourceFile, key: string): ts.ArrayLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  if (!ts.isObjectLiteralExpression(held)) return null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== key) continue
    return ts.isArrayLiteralExpression(one.initializer) ? one.initializer : null
  }
  return null
}

export function withoutNamed(path: string, text: string, dropping: ReadonlySet<string>): string {
  const source = ts.parseJsonText(path, text)
  const held = listedIn(source, WORKSPACES)
  if (held === null) return text
  const spans: Span[] = []
  for (const one of held.elements) {
    if (ts.isStringLiteral(one) && dropping.has(one.text)) spans.push(listEntrySpan(text, one))
  }
  let body = text
  for (const one of [...spans].sort((first, next) => next.start - first.start)) {
    body = `${body.slice(0, one.start)}${body.slice(one.end)}`
  }
  return body
}

export type Workspacing = {
  readonly edits: readonly FileEdit[]
  readonly unmoved: readonly Held[]
  readonly emptied: readonly string[]
  readonly why: string | null
}

export const NO_WORKSPACING: Workspacing = { edits: [], unmoved: [], emptied: [], why: null }

export function workspacingOver(
  root: string,
  base: string,
  going: ReadonlySet<string>
): Workspacing {
  const bytes = bodyAt(root, base, MANIFEST)
  if (bytes === null) return NO_WORKSPACING
  const text = textOf(bytes)
  if (text === null) return NO_WORKSPACING
  const named = workspacesIn(text)
  if (named === null) return NO_WORKSPACING
  const emptied = [...emptiedBy(named, going)].sort()
  if (emptied.length === 0) return NO_WORKSPACING
  const mended = withoutNamed(MANIFEST, text, new Set(emptied))
  if (mended === text) return NO_WORKSPACING
  return {
    edits: [{ path: MANIFEST, body: new TextEncoder().encode(mended) }],
    unmoved: [{ path: MANIFEST, was: bytes }],
    emptied,
    why: null,
  }
}

export function workspacingFor(
  root: string,
  base: string,
  going: ReadonlySet<string>
): Workspacing {
  try {
    return workspacingOver(root, base, going)
  } catch (thrown) {
    return {
      edits: [],
      unmoved: [],
      emptied: [],
      why:
        `the root ${MANIFEST} could not be read at ${base}, so no workspace entry was dropped ` +
        `and the removal went ahead alone — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
    }
  }
}

export function workspacingSaid(held: Workspacing): readonly string[] {
  if (held.why !== null) return [held.why]
  if (held.emptied.length === 0) return []
  return [
    `${MANIFEST} stopped naming ` +
      `${counted(held.emptied.length, "workspace")} this removal empties — ` +
      held.emptied.map((one) => `\`${one}\``).join(", "),
    WORKSPACE_SPELLING,
  ]
}
