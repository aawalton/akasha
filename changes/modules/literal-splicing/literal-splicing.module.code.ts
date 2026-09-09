import ts from "typescript"
import type { Splice } from "../answer/change-answer.module.types.ts"
import { keyOf } from "../page-literal/page-literal.module.code.ts"

function commaAfter(text: string, from: number, limit: number): number {
  for (let at = from; at < limit; at += 1) {
    const one = text[at] ?? ""
    if (one === ",") return at + 1
    if (one.trim() !== "") return from
  }
  return from
}

export function withValue(
  source: ts.SourceFile,
  holding: ts.ArrayLiteralExpression,
  value: string
): Splice {
  const put = JSON.stringify(value)
  const last = holding.elements[holding.elements.length - 1]
  if (last === undefined) {
    const opened = holding.getStart(source) + 1
    return { from: opened, to: opened, put }
  }
  const ended = last.getEnd()
  return { from: ended, to: ended, put: `, ${put}` }
}

export function withProperty(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  put: string,
  after: string | undefined
): Splice {
  const named = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === after
  )
  const anchor = named ?? owner.properties[owner.properties.length - 1]
  if (anchor === undefined) {
    const opened = owner.getStart(source) + 1
    return { from: opened, to: opened, put: `\n  ${put},\n` }
  }
  const started = anchor.getStart(source)
  const indent = text.slice(text.lastIndexOf("\n", started) + 1, started)
  const ended = anchor.getEnd()
  return { from: ended, to: ended, put: `,\n${indent}${put}` }
}

export function without(
  text: string,
  source: ts.SourceFile,
  held: ts.Node,
  every: readonly ts.Node[],
  at: number
): Splice {
  const one = every[at]
  if (one === undefined) return { from: 0, to: 0, put: "" }
  if (every.length === 1) {
    return { from: held.getStart(source) + 1, to: held.getEnd() - 1, put: "" }
  }
  const past = commaAfter(text, one.getEnd(), held.getEnd())
  if (past > one.getEnd()) return { from: one.pos, to: past, put: "" }
  const before = every[at - 1]
  const from = before === undefined ? held.getStart(source) + 1 : before.getEnd()
  return { from, to: one.getEnd(), put: "" }
}
