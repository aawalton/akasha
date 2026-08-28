
import type { Block, Document, HeadingLevel, Inline, ListItem, Position, Row, Section, Span } from "./types.ts"
import { frontmatter } from "./frontmatter.ts"
import { inlines } from "./inline.ts"
import { indentOf, locate, reach, Source, type Segment } from "./position.ts"

const FENCE = /^(\s*)(```|~~~)\s*(\S*)\s*$/
const HEADING = /^(#{1,6})(?:[ \t]+(.*?))?[ \t]*$/
const BULLET = /^([ \t]*)([-*+])[ \t]+(\S.*)$/
const ORDERED = /^([ \t]*)(\d+)[.)][ \t]+(\S.*)$/
const INDENT = 4

type Token =
  | { kind: "heading"; level: HeadingLevel; content: Inline[]; span: Span }
  | { kind: "block"; block: Block }

type Marker = { indent: number; ordered: boolean; from: number }

function markerOf(line: string): Marker | null {
  const bullet = BULLET.exec(line)
  if (bullet !== null) return { indent: bullet[1]!.length, ordered: false, from: line.length - bullet[3]!.length }
  const ordered = ORDERED.exec(line)
  if (ordered !== null) return { indent: ordered[1]!.length, ordered: true, from: line.length - ordered[3]!.length }
  return null
}

function isDelimiterRow(line: string | undefined): boolean {
  if (line === undefined || !line.includes("|")) return false
  const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|")
  return cells.every((cell) => /^\s*:?-+:?\s*$/.test(cell))
}

function cellsOf(line: string): Segment[] {
  const text = line.trimEnd()
  const start = text.trimStart().startsWith("|") ? text.indexOf("|") + 1 : 0
  const stop = text.length > start && text.endsWith("|") ? text.length - 1 : text.length
  const out: Segment[] = []
  let from = start
  for (let i = start; i <= stop; i += 1) {
    if (i !== stop && text[i] !== "|") continue
    const raw = text.slice(from, i)
    out.push({ line: 0, from: from + (raw.length - raw.trimStart().length), to: from + raw.trimEnd().length })
    from = i + 1
  }
  return out
}

function rowOf(source: Source, line: number): Row {
  return cellsOf(source.lines[line]!).map((cell) => {
    const loc = locate(source, [{ line, from: cell.from, to: cell.to }])
    return inlines(loc, 0, loc.text.length, [])
  })
}

type Draft = { segments: Segment[]; children: Draft[]; indent: number; last: number }

function listAt(
  source: Source,
  from: number,
  to: number,
  opener: Marker
): { block: Extract<Block, { kind: "list" }>; end: number } {
  const drafts: Draft[] = []
  let line = from
  let end = from
  while (line < to) {
    const text = source.lines[line]!.trimEnd()
    if (text === "") {
      line += 1
      continue
    }
    const marker = markerOf(text)
    const owner = drafts[drafts.length - 1]
    if (marker === null) {
      if (indentOf(text) <= opener.indent || owner === undefined || FENCE.test(text)) break
      const target = owner.children[owner.children.length - 1] ?? owner
      target.segments.push({ line, from: indentOf(text), to: text.length })
      target.last = line
      owner.last = line
    } else if (marker.indent > opener.indent && owner !== undefined) {
      owner.children.push({ segments: [{ line, from: marker.from, to: text.length }], children: [], indent: marker.indent, last: line })
      owner.last = line
    } else {
      if (marker.ordered !== opener.ordered) break
      drafts.push({ segments: [{ line, from: marker.from, to: text.length }], children: [], indent: marker.indent, last: line })
    }
    end = line + 1
    line += 1
  }
  const seal = (draft: Draft): ListItem => {
    const loc = locate(source, draft.segments)
    return {
      content: inlines(loc, 0, loc.text.length, []),
      children: draft.children.map(seal),
      span: { start: source.at(draft.segments[0]!.line, draft.indent), end: source.endOf(draft.last) },
    }
  }
  return {
    block: {
      kind: "list",
      ordered: opener.ordered,
      items: drafts.map(seal),
      span: { start: source.at(from, opener.indent), end: source.endOf(Math.max(from, end - 1)) },
    },
    end,
  }
}

function blocks(source: Source, from: number, to: number): Token[] {
  const out: Token[] = []
  let line = from
  let prose = -1
  while (line < to) {
    const raw = source.lines[line]!
    if (raw.trim() === "") {
      line += 1
      continue
    }
    const heading = HEADING.exec(raw)
    if (heading !== null) {
      const title = heading[2] ?? ""
      const at = title === "" ? raw.trimEnd().length : raw.indexOf(title, heading[1]!.length)
      const loc = locate(source, [{ line, from: at, to: at + title.length }])
      out.push({
        kind: "heading",
        level: heading[1]!.length as HeadingLevel,
        content: inlines(loc, 0, title.length, []),
        span: source.span(line, 0, raw.trimEnd().length),
      })
      line += 1
      continue
    }
    const fence = FENCE.exec(raw)
    if (fence !== null) {
      const close = new RegExp(`^\\s*${fence[2]!}\\s*$`)
      let at = line + 1
      while (at < to && !close.test(source.lines[at]!)) at += 1
      out.push({
        kind: "block",
        block: {
          kind: "fence",
          lang: fence[3] === "" ? null : fence[3]!,
          text: source.lines.slice(line + 1, Math.min(at, to)).join("\n"),
          span: { start: source.at(line, 0), end: source.endOf(Math.min(at, to - 1)) },
        },
      })
      line = at + 1
      continue
    }
    if (indentOf(raw) >= INDENT && line !== prose) {
      let at = line
      let last = line
      while (at < to) {
        const text = source.lines[at]!
        if (text.trim() !== "" && indentOf(text) < INDENT) break
        if (text.trim() !== "") last = at
        at += 1
      }
      out.push({
        kind: "block",
        block: {
          kind: "fence",
          lang: null,
          text: source.lines
            .slice(line, last + 1)
            .map((text) => (text.trim() === "" ? "" : text.slice(INDENT)))
            .join("\n"),
          span: { start: source.at(line, 0), end: source.endOf(last) },
        },
      })
      line = last + 1
      continue
    }
    if (raw.includes("|") && isDelimiterRow(source.lines[line + 1])) {
      const header = rowOf(source, line)
      const rows: Row[] = []
      let at = line + 2
      while (at < to && source.lines[at]!.includes("|")) {
        rows.push(rowOf(source, at))
        at += 1
      }
      out.push({
        kind: "block",
        block: { kind: "table", header, rows, span: { start: source.at(line, 0), end: source.endOf(at - 1) } },
      })
      line = at
      continue
    }
    const marker = markerOf(raw)
    if (marker !== null) {
      const list = listAt(source, line, to, marker)
      out.push({ kind: "block", block: list.block })
      line = list.end
      continue
    }
    const segments: Segment[] = []
    while (line < to) {
      const text = source.lines[line]!
      if (text.trim() === "" || HEADING.test(text) || FENCE.test(text) || markerOf(text) !== null) break
      if (text.includes("|") && isDelimiterRow(source.lines[line + 1])) break
      segments.push({ line, from: indentOf(text), to: text.trimEnd().length })
      line += 1
    }
    prose = line
    const loc = locate(source, segments)
    out.push({
      kind: "block",
      block: { kind: "paragraph", content: inlines(loc, 0, loc.text.length, []), span: reach(loc, 0, loc.text.length) },
    })
  }
  return out
}

type Build = {
  level: HeadingLevel
  heading: Inline[]
  blocks: Block[]
  sections: Build[]
  start: Position
  head: Position
}

function seal(build: Build): Section {
  const sections = build.sections.map(seal)
  const end = sections[sections.length - 1]?.span.end ?? build.blocks[build.blocks.length - 1]?.span.end ?? build.head
  return { level: build.level, heading: build.heading, blocks: build.blocks, sections, span: { start: build.start, end } }
}

function fold(tokens: readonly Token[]): Section[] {
  const roots: Build[] = []
  const stack: Build[] = []
  for (const token of tokens) {
    if (token.kind === "heading") {
      const build: Build = {
        level: token.level,
        heading: token.content,
        blocks: [],
        sections: [],
        start: token.span.start,
        head: token.span.end,
      }
      while (stack.length > 0 && stack[stack.length - 1]!.level >= token.level) stack.pop()
      const parent = stack[stack.length - 1]
      if (parent === undefined) roots.push(build)
      else parent.sections.push(build)
      stack.push(build)
      continue
    }
    if (stack.length === 0) {
      const build: Build = {
        level: 1,
        heading: [],
        blocks: [],
        sections: [],
        start: token.block.span.start,
        head: token.block.span.start,
      }
      roots.push(build)
      stack.push(build)
    }
    stack[stack.length - 1]!.blocks.push(token.block)
  }
  return roots.map(seal)
}

export function parse(text: string, path: string): Document {
  const source = Source(text.replace(/\r\n/g, "\n"))
  const { keys, below, unreadable } = frontmatter(source)
  return {
    path,
    frontmatter: keys,
    unreadable,
    sections: fold(blocks(source, below, source.lines.length)),
    span: { start: source.at(0, 0), end: source.endOf(source.lines.length - 1) },
  }
}
