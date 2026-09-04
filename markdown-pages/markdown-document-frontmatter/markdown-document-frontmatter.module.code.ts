import type {
  FrontmatterKey,
  FrontmatterValue,
  MapEntry,
  Scalar,
  Span,
} from "@akasha/pages-system/markdown-document"
import {
  indentOf,
  type Source,
} from "../markdown-document-position/markdown-document-position.module.code.ts"

const KEYED = /^([A-Za-z0-9_][A-Za-z0-9_.-]*):(?:[ \t]+(.*))?$/
const ITEM = /^([ \t]*)-(?:[ \t]+(.*))?$/
const DELIMITER = "---"

const ESCAPED: Readonly<Record<string, string>> = {
  n: "\n",
  t: "\t",
  r: "\r",
  b: "\b",
  f: "\f",
  "0": "\0",
  '"': '"',
  "\\": "\\",
  "/": "/",
}

type Chomp = "strip" | "clip"

interface Block {
  readonly folded: boolean
  readonly chomp: Chomp
}

function blockHeader(raw: string): Block | null {
  const style = raw[0]
  if (style !== "|" && style !== ">") return null
  const mark = raw.slice(1)
  if (mark !== "" && mark !== "-") return null
  return { folded: style === ">", chomp: mark === "-" ? "strip" : "clip" }
}

function folded(kept: readonly string[]): string {
  let text = ""
  let at = 0
  while (at < kept.length) {
    const line = kept[at]!
    if (at === 0) {
      text = line
      at += 1
      continue
    }
    if (line === "") {
      let run = 0
      while (at < kept.length && kept[at] === "") {
        run += 1
        at += 1
      }
      text += "\n".repeat(run)
      if (at < kept.length) {
        text += kept[at]!
        at += 1
      }
      continue
    }
    text += indentOf(line) > 0 || indentOf(kept[at - 1]!) > 0 ? `\n${line}` : ` ${line}`
    at += 1
  }
  return text
}

function blockText(source: Source, first: number, last: number, head: Block): string {
  let column = -1
  for (let i = first; i <= last; i += 1) {
    const text = source.lines[i]!
    if (text.trim() === "") continue
    column = indentOf(text)
    break
  }
  if (column < 0) return ""
  const raw: string[] = []
  for (let i = first; i <= last; i += 1) {
    const line = source.lines[i]!.replace(/[ \t]+$/, "")
    raw.push(line.length <= column ? "" : line.slice(column))
  }
  let end = raw.length
  while (end > 0 && raw[end - 1] === "") end -= 1
  const kept = raw.slice(0, end)
  const body = head.folded ? folded(kept) : kept.join("\n")
  return body === "" || head.chomp === "strip" ? body : `${body}\n`
}

function unquote(raw: string): string {
  if (raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1).replace(/\\(u[0-9A-Fa-f]{4}|[\s\S])/g, (all, code: string) => {
      if (code.length === 5 && (code[0] === "u" || code[0] === "U"))
        return String.fromCharCode(Number.parseInt(code.slice(1), 16))
      return ESCAPED[code] ?? all
    })
  }
  if (raw.length >= 2 && raw.startsWith("'") && raw.endsWith("'"))
    return raw.slice(1, -1).replace(/''/g, "'")
  return raw
}

function scalar(source: Source, line: number, from: number, raw: string): Scalar {
  return { text: unquote(raw), span: source.span(line, from, from + raw.length) }
}

function blockScalar(source: Source, line: number, end: number, at: number, raw: string): Scalar {
  const head = blockHeader(raw)!
  return {
    text: end > line ? blockText(source, line + 1, end, head) : "",
    span: { start: source.at(line, at), end: source.endOf(end) },
  }
}

function keyOf(
  source: Source,
  line: number,
  start: number,
  body: string
): { key: Scalar; rest: string; restAt: number } | null {
  const match = KEYED.exec(body)
  if (match === null) return null
  const rest = match[2] ?? ""
  return {
    key: scalar(source, line, start, match[1]!),
    rest,
    restAt: start + body.length - rest.length,
  }
}

function swallowed(source: Source, from: number, to: number, unreadable: Span[]) {
  for (let i = from; i <= to; i += 1) {
    const text = source.lines[i]!.trimEnd()
    if (text !== "") unreadable.push(source.span(i, 0, text.length))
  }
}

function nested(source: Source, line: number, last: number, indent: number): number {
  let end = line
  for (let i = line + 1; i <= last; i += 1) {
    const text = source.lines[i]!
    if (text.trim() === "") continue
    if (indentOf(text) <= indent) break
    end = i
  }
  return end
}

function valueFor(
  source: Source,
  line: number,
  end: number,
  key: { key: Scalar; rest: string; restAt: number },
  indent: number,
  unreadable: Span[]
): FrontmatterValue {
  if (key.rest !== "" && blockHeader(key.rest) !== null)
    return { kind: "scalar", value: blockScalar(source, line, end, key.restAt, key.rest) }
  if (key.rest !== "" && end > line) swallowed(source, line + 1, end, unreadable)
  return key.rest !== "" || end === line
    ? { kind: "scalar", value: scalar(source, line, key.restAt, key.rest) }
    : fmChildren(source, line + 1, end, unreadable)
}

function fmItemEntries(
  source: Source,
  line: number,
  last: number,
  column: number,
  key: { key: Scalar; rest: string; restAt: number },
  unreadable: Span[]
): MapEntry[] {
  const own = nested(source, line, last, column)
  const entries: MapEntry[] = [
    { key: key.key, value: valueFor(source, line, own, key, column, unreadable) },
  ]
  if (own < last) {
    const rest = fmMap(source, own + 1, last, unreadable)
    if (rest.kind === "map") entries.push(...rest.entries)
  }
  return entries
}

function fmList(source: Source, first: number, last: number, unreadable: Span[]): FrontmatterValue {
  const indent = indentOf(source.lines[first] ?? "")
  const items: FrontmatterValue[] = []
  let line = first
  while (line <= last) {
    const text = source.lines[line]!.trimEnd()
    const match = ITEM.exec(text)
    if (text === "" || match === null || match[1]!.length !== indent) {
      if (text !== "") unreadable.push(source.span(line, 0, text.length))
      line += 1
      continue
    }
    const body = match[2] ?? ""
    const start = text.length - body.length
    const end = nested(source, line, last, indent)
    const key = keyOf(source, line, start, body)
    if (key !== null) {
      if (key.rest !== "" || end > line) {
        items.push({
          kind: "map",
          entries: fmItemEntries(source, line, end, start, key, unreadable),
          span: { start: source.at(line, indent), end: source.endOf(end) },
        })
      } else {
        items.push({ kind: "scalar", value: scalar(source, line, start, body) })
      }
    } else if (body !== "" && blockHeader(body) !== null) {
      items.push({ kind: "scalar", value: blockScalar(source, line, end, start, body) })
    } else {
      if (end > line) swallowed(source, line + 1, end, unreadable)
      items.push({ kind: "scalar", value: scalar(source, line, start, body) })
    }
    line = end + 1
  }
  return { kind: "list", items, span: { start: source.at(first, indent), end: source.endOf(last) } }
}

function fmMap(source: Source, first: number, last: number, unreadable: Span[]): FrontmatterValue {
  const indent = indentOf(source.lines[first] ?? "")
  const entries: MapEntry[] = []
  let line = first
  while (line <= last) {
    const text = source.lines[line]!.trimEnd()
    const key = indentOf(text) === indent ? keyOf(source, line, indent, text.slice(indent)) : null
    if (key === null) {
      if (text !== "") unreadable.push(source.span(line, 0, text.length))
      line += 1
      continue
    }
    const end = nested(source, line, last, indent)
    entries.push({ key: key.key, value: valueFor(source, line, end, key, indent, unreadable) })
    line = end + 1
  }
  return {
    kind: "map",
    entries,
    span: { start: source.at(first, indent), end: source.endOf(last) },
  }
}

function fmChildren(
  source: Source,
  first: number,
  last: number,
  unreadable: Span[]
): FrontmatterValue {
  for (let i = first; i <= last; i += 1) {
    const text = source.lines[i]!.trimEnd()
    if (text === "") continue
    if (ITEM.exec(text) === null && KEYED.test(text.slice(indentOf(text))))
      return fmMap(source, first, last, unreadable)
    break
  }
  return fmList(source, first, last, unreadable)
}

export function frontmatter(source: Source): {
  keys: FrontmatterKey[]
  below: number
  unreadable: Span[]
} {
  if (source.lines[0] !== DELIMITER) return { keys: [], below: 0, unreadable: [] }
  const unreadable: Span[] = []
  const close = source.lines.indexOf(DELIMITER, 1)
  if (close === -1) return { keys: [], below: 0, unreadable: [source.span(0, 0, DELIMITER.length)] }
  const keys: FrontmatterKey[] = []
  let line = 1
  while (line < close) {
    const text = source.lines[line]!.trimEnd()
    const key = indentOf(text) === 0 ? keyOf(source, line, 0, text) : null
    if (key === null) {
      if (text !== "") unreadable.push(source.span(line, 0, text.length))
      line += 1
      continue
    }
    const end = nested(source, line, close - 1, 0)
    keys.push({
      name: key.key.text,
      value: valueFor(source, line, end, key, 0, unreadable),
      span: { start: source.at(line, 0), end: source.endOf(end) },
    })
    line = end + 1
  }
  return { keys, below: close + 1, unreadable }
}
