import ts from "typescript"
import type { Splice } from "../answer/change-answer.module.types.ts"

export function objectOf(source: ts.JsonSourceFile): ts.ObjectLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  return ts.isObjectLiteralExpression(held) ? held : null
}

function valueAt(source: ts.JsonSourceFile, key: string): ts.Expression | null {
  const held = objectOf(source)
  if (held === null) return null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text === key) return one.initializer
  }
  return null
}

export function objectAt(
  source: ts.JsonSourceFile,
  key: string
): ts.ObjectLiteralExpression | null {
  const held = valueAt(source, key)
  return held !== null && ts.isObjectLiteralExpression(held) ? held : null
}

export function textAt(source: ts.JsonSourceFile, key: string): string | null {
  const held = valueAt(source, key)
  return held !== null && ts.isStringLiteral(held) ? held.text : null
}

function commaBefore(text: string, from: number): number {
  let back = from - 1
  while (back >= 0) {
    const here = text[back] ?? ""
    if (here === ",") return back
    if (here.trim() !== "") break
    back = back - 1
  }
  return from
}

export function goneSpan(text: string, node: ts.Node, after: boolean): Splice {
  const from = node.getFullStart()
  const to = node.getEnd()
  let at = to
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === ",") return { from, to: at + 1, put: "" }
    if (here.trim() !== "") break
    at = at + 1
  }
  return { from: after ? from : commaBefore(text, from), to, put: "" }
}

export function goneFrom(
  text: string,
  held: ts.ObjectLiteralExpression,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  const spans: Splice[] = []
  let after = false
  let opened = 0
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) {
      after = false
      continue
    }
    if (!dropping.has(one.name.text)) {
      after = false
      continue
    }
    if (!after) opened = spans.length
    spans.push(goneSpan(text, one, after))
    after = true
  }
  const first = spans[opened]
  if (!after || first === undefined) return spans
  spans[opened] = { from: commaBefore(text, first.from), to: first.to, put: first.put }
  return spans
}

export function entriesGoingIn(
  at: string,
  text: string,
  holding: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  const held = objectAt(ts.parseJsonText(at, text), holding)
  return held === null ? [] : goneFrom(text, held, dropping)
}

export function keysGoingIn(
  at: string,
  text: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  const held = objectOf(ts.parseJsonText(at, text))
  return held === null ? [] : goneFrom(text, held, dropping)
}
