
import type { Position, Span } from "./types.ts"

export class Source {
  readonly text: string
  readonly lines: readonly string[]
  private readonly starts: readonly number[]

  constructor(text: string) {
    this.text = text
    this.lines = text.split("\n")
    const starts: number[] = []
    let offset = 0
    for (const line of this.lines) {
      starts.push(offset)
      offset += line.length + 1
    }
    this.starts = starts
  }

  at(line: number, column: number): Position {
    return { line: line + 1, column: column + 1, offset: (this.starts[line] ?? this.text.length) + column }
  }

  endOf(line: number): Position {
    return this.at(line, this.lines[line]?.length ?? 0)
  }

  span(line: number, from: number, to: number): Span {
    return { start: this.at(line, from), end: this.at(line, to) }
  }
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
