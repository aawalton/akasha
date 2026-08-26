
import type { Inline } from "./types.ts"
import { reach, type Located } from "./position.ts"

type Mark = Inline["marks"][number]

const WORD = /[\p{L}\p{N}_]/u

function backticks(text: string, from: number): number {
  let run = 0
  while (text[from + run] === "`") run += 1
  return run
}

function skipCode(text: string, from: number, to: number): number {
  const open = backticks(text, from)
  for (let i = from + open; i < to; i += 1) {
    if (text[i] !== "`") continue
    const run = backticks(text, i)
    if (run === open) return i + run
    i += run - 1
  }
  return from
}

function unpad(text: string): string {
  const padded = text.startsWith(" ") && text.endsWith(" ") && text.trim() !== ""
  return padded ? text.slice(1, -1) : text
}

function closer(text: string, from: number, to: number, delim: string): number {
  const char = delim[0]!
  const nested = text[from] === char
  for (let i = from; i < to; i += 1) {
    if (text[i] === "`") {
      const past = skipCode(text, i, to)
      if (past > i) {
        i = past - 1
        continue
      }
    }
    if (i + delim.length > to) break
    if (!text.startsWith(delim, i)) continue
    const before = i > from ? text[i - 1]! : ""
    const after = i + delim.length < to ? text[i + delim.length]! : ""
    if (before === " ") continue
    if (nested && after === char) continue
    if (delim === "*" && (after === "*" || before === "*")) continue
    if (char === "_" && WORD.test(after)) continue
    return i
  }
  return -1
}

function linkAt(text: string, from: number, to: number): { text: string; href: string; end: number } | null {
  const close = text.indexOf("]", from + 1)
  if (close === -1 || close >= to || text[close + 1] !== "(") return null
  const end = text.indexOf(")", close + 2)
  if (end === -1 || end >= to) return null
  return { text: text.slice(from + 1, close), href: text.slice(close + 2, end), end: end + 1 }
}

export function inlines(loc: Located, from: number, to: number, marks: readonly Mark[]): Inline[] {
  const out: Inline[] = []
  let run = from
  let i = from
  const flush = (end: number): void => {
    if (end > run) out.push({ kind: "text", text: loc.text.slice(run, end), marks, span: reach(loc, run, end) })
  }
  while (i < to) {
    const char = loc.text[i]!
    if (char === "`") {
      const past = skipCode(loc.text, i, to)
      if (past > i) {
        flush(i)
        const open = backticks(loc.text, i)
        const text = unpad(loc.text.slice(i + open, past - open))
        out.push({ kind: "text", text, marks: [...marks, "code"], span: reach(loc, i, past) })
        i = past
        run = i
        continue
      }
    }
    if (char === "[") {
      const found = linkAt(loc.text, i, to)
      if (found !== null) {
        flush(i)
        out.push({ kind: "link", text: found.text, href: found.href, marks, span: reach(loc, i, found.end) })
        i = found.end
        run = i
        continue
      }
    }
    const marker = char === "*" || char === "_"
    const prev = i > from ? loc.text[i - 1]! : ""
    const strong = marker && loc.text[i + 1] === char && (char === "*" || !WORD.test(prev))
    const em = !strong && marker && !WORD.test(prev)
    if (strong || em) {
      const delim = strong ? char + char : char
      const inner = i + delim.length
      const close = loc.text[inner] === " " || inner >= to ? -1 : closer(loc.text, inner, to, delim)
      if (close !== -1) {
        flush(i)
        out.push(...inlines(loc, inner, close, [...marks, strong ? "strong" : "em"]))
        i = close + delim.length
        run = i
        continue
      }
    }
    i += 1
  }
  flush(to)
  return merge(out)
}

function merge(nodes: readonly Inline[]): Inline[] {
  const out: Inline[] = []
  for (const node of nodes) {
    const last = out[out.length - 1]
    if (
      last !== undefined &&
      last.kind === "text" &&
      node.kind === "text" &&
      !last.marks.includes("code") &&
      !node.marks.includes("code") &&
      last.marks.length === node.marks.length &&
      last.marks.every((mark, index) => mark === node.marks[index]) &&
      last.span.end.offset === node.span.start.offset
    ) {
      out[out.length - 1] = {
        ...last,
        text: last.text + node.text,
        span: { start: last.span.start, end: node.span.end },
      }
      continue
    }
    out.push(node)
  }
  return out
}
