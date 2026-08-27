import { matchClosingBrace, skipStringLiteral } from "./worker-shape-handlers"

export const TICK_YIELD_IRREDUCIBLE_PRAGMA = "// worker-shape: tick-yield-irreducible"

export type AwaitingLoopKind = "for-of" | "for-in" | "for-await-of" | "for" | "while" | "do-while"

export const LOOP_KIND_ITERATES: ReadonlySet<AwaitingLoopKind> = new Set<AwaitingLoopKind>([
  "for-of",
  "for-in",
  "for-await-of",
])

export interface UnguardedAwaitingLoopSite {
  readonly line: number
  readonly kind: AwaitingLoopKind
}

export function hasTickYieldIrreduciblePragma(source: string): boolean {
  return source.includes(TICK_YIELD_IRREDUCIBLE_PRAGMA)
}

const stripComments = (text: string): string =>
  text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*\n/g, "\n")

function yieldsToAbort(text: string): boolean {
  const stripped = stripComments(text)
  if (/\.throwIfAborted\s*\(/.test(stripped)) return true
  if (/\.aborted\b/.test(stripped)) return true
  if (/\bforEachAbortable\s*\(/.test(stripped)) return true
  return false
}

function textAwaits(text: string): boolean {
  return /\bawait\b/.test(stripComments(text))
}

function matchClosingParen(source: string, openIdx: number): number {
  let depth = 0
  let i = openIdx
  const n = source.length
  while (i < n) {
    const c = source[i]
    const next = i + 1 < n ? source[i + 1] : ""
    if (c === "/" && next === "/") {
      const nl = source.indexOf("\n", i + 2)
      i = nl === -1 ? n : nl + 1
      continue
    }
    if (c === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2)
      i = end === -1 ? n : end + 2
      continue
    }
    if (c === '"' || c === "'" || c === "`") {
      i = skipStringLiteral(source, i, c)
      continue
    }
    if (c === "(") depth += 1
    else if (c === ")") {
      depth -= 1
      if (depth === 0) return i
    }
    i += 1
  }
  return -1
}

function skipTrivia(source: string, from: number): number {
  let i = from
  const n = source.length
  while (i < n) {
    const c = source[i] ?? ""
    const next = i + 1 < n ? (source[i + 1] ?? "") : ""
    if (c === "/" && next === "/") {
      const nl = source.indexOf("\n", i + 2)
      i = nl === -1 ? n : nl + 1
      continue
    }
    if (c === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2)
      i = end === -1 ? n : end + 2
      continue
    }
    if (/\s/.test(c)) {
      i += 1
      continue
    }
    return i
  }
  return n
}

const isIdentChar = (ch: string): boolean => /[A-Za-z0-9_$]/.test(ch)

function wordAt(source: string, idx: number, word: string): boolean {
  if (source.slice(idx, idx + word.length) !== word) return false
  const after = source[idx + word.length] ?? ""
  return after === "" || !isIdentChar(after)
}

interface ParsedLoop {
  readonly kind: AwaitingLoopKind
  readonly header: string
  readonly body: string
}

function forKindOf(header: string, isForAwait: boolean): AwaitingLoopKind {
  if (isForAwait) return "for-await-of"
  const stripped = stripComments(header)
  if (stripped.includes(";")) return "for"
  if (/\bof\b/.test(stripped)) return "for-of"
  if (/\bin\b/.test(stripped)) return "for-in"
  return "for"
}

function parseLoop(source: string, keywordIdx: number, keyword: string): ParsedLoop | null {
  if (keyword === "do") {
    const bodyOpen = skipTrivia(source, keywordIdx + "do".length)
    if (source[bodyOpen] !== "{") return null
    const bodyClose = matchClosingBrace(source, bodyOpen)
    if (bodyClose === -1) return null
    const tail = skipTrivia(source, bodyClose + 1)
    if (!wordAt(source, tail, "while")) return null
    const parenOpen = skipTrivia(source, tail + "while".length)
    if (source[parenOpen] !== "(") return null
    const parenClose = matchClosingParen(source, parenOpen)
    if (parenClose === -1) return null
    return {
      kind: "do-while",
      header: source.slice(tail, parenClose + 1),
      body: source.slice(bodyOpen + 1, bodyClose),
    }
  }

  let cursor = skipTrivia(source, keywordIdx + keyword.length)
  const isForAwait = keyword === "for" && wordAt(source, cursor, "await")
  if (isForAwait) cursor = skipTrivia(source, cursor + "await".length)
  if (source[cursor] !== "(") return null
  const parenClose = matchClosingParen(source, cursor)
  if (parenClose === -1) return null
  const bodyOpen = skipTrivia(source, parenClose + 1)
  if (source[bodyOpen] !== "{") return null
  const bodyClose = matchClosingBrace(source, bodyOpen)
  if (bodyClose === -1) return null
  const header = source.slice(keywordIdx, parenClose + 1)
  return {
    kind: keyword === "while" ? "while" : forKindOf(header, isForAwait),
    header,
    body: source.slice(bodyOpen + 1, bodyClose),
  }
}

export function findUnguardedAwaitingLoops(source: string): readonly UnguardedAwaitingLoopSite[] {
  const sites: UnguardedAwaitingLoopSite[] = []
  const n = source.length
  let i = 0
  while (i < n) {
    const c = source[i] ?? ""
    const next = i + 1 < n ? (source[i + 1] ?? "") : ""
    if (c === "/" && next === "/") {
      const nl = source.indexOf("\n", i + 2)
      i = nl === -1 ? n : nl + 1
      continue
    }
    if (c === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2)
      i = end === -1 ? n : end + 2
      continue
    }
    if (c === '"' || c === "'" || c === "`") {
      i = skipStringLiteral(source, i, c)
      continue
    }
    if (!isIdentChar(c)) {
      i += 1
      continue
    }
    let end = i
    while (end < n && isIdentChar(source[end] ?? "")) end += 1
    const word = source.slice(i, end)
    const prev = i > 0 ? (source[i - 1] ?? "") : ""
    if (prev !== "." && (word === "for" || word === "while" || word === "do")) {
      const loop = parseLoop(source, i, word)
      if (
        loop !== null &&
        textAwaits(loop.body) &&
        !yieldsToAbort(loop.body) &&
        !yieldsToAbort(loop.header)
      ) {
        sites.push({ line: source.slice(0, i).split("\n").length, kind: loop.kind })
      }
    }
    i = end
  }
  return sites
}
