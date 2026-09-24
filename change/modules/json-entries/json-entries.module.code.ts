import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import ts from "typescript"

const LINE = "\n"

export function objectOf(source: ts.JsonSourceFile): ts.ObjectLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  return ts.isObjectLiteralExpression(held) ? held : null
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

function goneSpan(text: string, node: ts.Node, after: boolean): Splice {
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

function goneFrom(
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

export function keysGoingIn(
  at: string,
  text: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  const held = objectOf(ts.parseJsonText(at, text))
  return held === null ? [] : goneFrom(text, held, dropping)
}

export function keysGoingInEntries(
  at: string,
  text: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  const found: Splice[] = []
  let from = 0
  for (const line of text.split(LINE)) {
    for (const one of line.trim() === "" ? [] : keysGoingIn(at, line, dropping)) {
      found.push({ from: from + one.from, to: from + one.to, put: one.put })
    }
    from = from + line.length + LINE.length
  }
  return found
}

function valueAnew(
  source: ts.JsonSourceFile,
  said: ts.Expression,
  values: ReadonlyMap<string, string>
): Splice | null {
  if (!ts.isStringLiteral(said)) return null
  const now = values.get(said.text)
  if (now === undefined) return null
  return { from: said.getStart(source), to: said.getEnd(), put: JSON.stringify(now) }
}

function valuesAnewUnder(
  source: ts.JsonSourceFile,
  held: ts.ObjectLiteralExpression,
  key: string,
  values: ReadonlyMap<string, string>
): readonly Splice[] {
  const spans: Splice[] = []
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== key) continue
    const said = one.initializer
    for (const each of ts.isArrayLiteralExpression(said) ? said.elements : [said]) {
      const span = valueAnew(source, each, values)
      if (span !== null) spans.push(span)
    }
  }
  return spans
}

function valuesWrittenAnew(
  at: string,
  text: string,
  key: string,
  values: ReadonlyMap<string, string>
): readonly Splice[] {
  const source = ts.parseJsonText(at, text)
  const held = objectOf(source)
  return held === null ? [] : valuesAnewUnder(source, held, key, values)
}

export function valuesWrittenAnewInEntries(
  at: string,
  text: string,
  key: string,
  values: ReadonlyMap<string, string>
): readonly Splice[] {
  const found: Splice[] = []
  let from = 0
  for (const line of text.split(LINE)) {
    for (const one of line.trim() === "" ? [] : valuesWrittenAnew(at, line, key, values)) {
      found.push({ from: from + one.from, to: from + one.to, put: one.put })
    }
    from = from + line.length + LINE.length
  }
  return found
}

function stated(held: ts.ObjectLiteralExpression, key: string): ts.PropertyAssignment | null {
  for (const one of held.properties) {
    if (ts.isPropertyAssignment(one) && ts.isStringLiteral(one.name) && one.name.text === key) {
      return one
    }
  }
  return null
}

function spelledIn(source: ts.JsonSourceFile, text: string, one: ts.PropertyAssignment): string {
  return text.slice(one.initializer.getStart(source), one.initializer.getEnd())
}

function keyCopied(at: string, line: string, from: string, to: string): Splice | string | null {
  const source = ts.parseJsonText(at, line)
  const held = objectOf(source)
  if (held === null) return null
  const read = stated(held, from)
  if (read === null) return null
  const value = spelledIn(source, line, read)
  const written = stated(held, to)
  if (written === null) {
    return { from: read.getEnd(), to: read.getEnd(), put: `,${JSON.stringify(to)}:${value}` }
  }
  const already = spelledIn(source, line, written)
  if (already === value) return null
  return `\`${at}\` has an entry stating \`${to}\` as ${already} and \`${from}\` as ${value}`
}

export function keyCopiedInEntries(
  at: string,
  text: string,
  from: string,
  to: string
): readonly Splice[] | string {
  const found: Splice[] = []
  let offset = 0
  for (const line of text.split(LINE)) {
    const one = line.trim() === "" ? null : keyCopied(at, line, from, to)
    if (typeof one === "string") return one
    if (one !== null) found.push({ from: offset + one.from, to: offset + one.to, put: one.put })
    offset = offset + line.length + LINE.length
  }
  return found
}
