
import type { Position, Span } from "./types.ts"

export type Source = {
  readonly text: string
  readonly lines: readonly string[]
  readonly at: (line: number, column: number) => Position
  readonly endOf: (line: number) => Position
  readonly span: (line: number, from: number, to: number) => Span
}

export function Source(text: string): Source {
  const lines = text.split("\n")
  const starts: number[] = []
  let offset = 0
  for (const line of lines) {
    starts.push(offset)
    offset += line.length + 1
  }

  function at(line: number, column: number): Position {
    return { line: line + 1, column: column + 1, offset: (starts[line] ?? text.length) + column }
  }

  function endOf(line: number): Position {
    return at(line, lines[line]?.length ?? 0)
  }

  function span(line: number, from: number, to: number): Span {
    return { start: at(line, from), end: at(line, to) }
  }

  return { text, lines, at, endOf, span }
}

export type Located = { readonly text: string; readonly at: readonly Position[] }

export type Segment = { line: number; from: number; to: number }

export function locate(source: Source, segments: readonly Segment[]): Located {
  let text = ""
  const at: Position[] = []
  segments.forEach((segment, index) => {
    const previous = segments[index - 1]
    if (previous !== undefined) {
      at.push(source.at(previous.line, previous.to))
      text += " "
    }
    for (let column = segment.from; column < segment.to; column += 1) at.push(source.at(segment.line, column))
    text += source.lines[segment.line]!.slice(segment.from, segment.to)
  })
  const last = segments[segments.length - 1]
  at.push(last === undefined ? source.at(0, 0) : source.at(last.line, last.to))
  return { text, at }
}

export function reach(loc: Located, from: number, to: number): Span {
  const end = loc.at[loc.at.length - 1]!
  return { start: loc.at[from] ?? end, end: loc.at[to] ?? end }
}

export function indentOf(line: string): number {
  return line.length - line.trimStart().length
}
