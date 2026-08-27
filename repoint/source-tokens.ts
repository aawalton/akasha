/**
 * A LEXER ENOUGH TO TELL CODE FROM TEXT. What a rename must read inside a module — a string
 * standing as an argument, the static text of a template — is spelled exactly the same inside a
 * comment, inside another string and inside a regular expression, where it names nothing. A survey
 * that cannot tell those apart refuses moves nobody needs refused and rewrites text nobody wrote
 * as a path.
 *
 * This walks a body once and hands back the same body with every comment and every stretch of TEXT
 * blanked to spaces — positions and line breaks kept, so an index into one is an index into the
 * other and a pattern run over it can only match CODE. The strings and templates are handed back
 * beside it, keyed by where they start, so a caller that has found an argument's span can ask what
 * literal stands there.
 *
 * A STRING HOLDING A BACKSLASH REPORTS NO VALUE. Working out what an escape sequence means is
 * guessing, and a caller resolving a path wants the characters rather than a guess at them.
 */

export interface Span {
  readonly start: number
  readonly end: number
}

export interface StringToken extends Span {
  /** What stands between the quotes, or null where an escape means this cannot say. */
  readonly value: string | null
}

export interface TemplateToken extends Span {
  /** The stretches of static text, always one more than there are expressions. */
  readonly quasis: readonly Span[]
  /** The stretches of code between a `${` and its `}`. */
  readonly exprs: readonly Span[]
}

export interface Tokens {
  /** The body with every comment and every stretch of text blanked, positions kept. */
  readonly masked: string
  readonly strings: ReadonlyMap<number, StringToken>
  readonly templates: ReadonlyMap<number, TemplateToken>
}

const WORD = /[A-Za-z0-9_$]/

const SPACE = /\s/

// A `/` after one of these words opens a regular expression; after any other word it divides.
const BEFORE_PATTERN = new Set([
  "return",
  "typeof",
  "instanceof",
  "in",
  "of",
  "new",
  "delete",
  "void",
  "case",
  "do",
  "else",
  "yield",
  "await",
  "throw",
])

function patternEnd(body: string, at: number, prior: string, word: string): number | null {
  if (prior === ")" || prior === "]") return null
  if (WORD.test(prior) && !BEFORE_PATTERN.has(word)) return null
  let inside = false
  for (let cursor = at + 1; cursor < body.length; cursor += 1) {
    const here = body[cursor]
    if (here === "\\") {
      cursor += 1
      continue
    }
    if (here === "\n") return null
    if (here === "[") inside = true
    else if (here === "]") inside = false
    else if (here === "/" && !inside) return cursor + 1
  }
  return null
}

interface Frame {
  readonly start: number
  readonly quasis: Span[]
  readonly exprs: Span[]
  open: number
  depth: number
  exprAt: number
}

export function tokensOf(body: string): Tokens {
  const mask = [...body]
  const strings = new Map<number, StringToken>()
  const templates = new Map<number, TemplateToken>()
  const blank = (from: number, to: number): void => {
    for (let at = from; at < to; at += 1) if (mask[at] !== "\n") mask[at] = " "
  }
  const frames: Frame[] = []
  let at = 0
  let prior = ""
  let word = ""
  const note = (char: string): void => {
    if (SPACE.test(char)) return
    word = WORD.test(char) ? (WORD.test(prior) ? word + char : char) : ""
    prior = char
  }
  while (at < body.length) {
    const frame = frames.at(-1)
    const char = body[at] ?? ""
    if (frame !== undefined && frame.depth === 0) {
      if (char === "\\") {
        at += 2
        continue
      }
      if (char === "`") {
        frame.quasis.push({ start: frame.open, end: at })
        blank(frame.open, at)
        const { start, quasis, exprs } = frame
        templates.set(start, { start, end: at + 1, quasis, exprs })
        frames.pop()
        at += 1
        note("`")
        continue
      }
      if (char === "$" && body[at + 1] === "{") {
        frame.quasis.push({ start: frame.open, end: at })
        blank(frame.open, at)
        frame.depth = 1
        frame.exprAt = at + 2
        at += 2
        prior = ""
        word = ""
        continue
      }
      at += 1
      continue
    }
    if (char === "/" && body[at + 1] === "/") {
      const found = body.indexOf("\n", at)
      const to = found === -1 ? body.length : found
      blank(at, to)
      at = to
      continue
    }
    if (char === "/" && body[at + 1] === "*") {
      const found = body.indexOf("*/", at + 2)
      const to = found === -1 ? body.length : found + 2
      blank(at, to)
      at = to
      continue
    }
    if (char === '"' || char === "'") {
      let cursor = at + 1
      let escaped = false
      while (cursor < body.length) {
        const here = body[cursor]
        if (here === "\\") {
          escaped = true
          cursor += 2
          continue
        }
        if (here === char || here === "\n") break
        cursor += 1
      }
      const end = body[cursor] === char ? cursor + 1 : cursor
      strings.set(at, { start: at, end, value: escaped ? null : body.slice(at + 1, end - 1) })
      blank(at + 1, end - 1)
      at = end
      note(char)
      continue
    }
    if (char === "`") {
      frames.push({ start: at, quasis: [], exprs: [], open: at + 1, depth: 0, exprAt: at + 1 })
      at += 1
      continue
    }
    if (char === "/") {
      const end = patternEnd(body, at, prior, word)
      if (end !== null) {
        blank(at + 1, end - 1)
        at = end
        note(")")
        continue
      }
    }
    if (frame !== undefined) {
      if (char === "{" || char === "(" || char === "[") frame.depth += 1
      else if (char === ")" || char === "]") frame.depth -= 1
      else if (char === "}") {
        frame.depth -= 1
        if (frame.depth === 0) {
          frame.exprs.push({ start: frame.exprAt, end: at })
          frame.open = at + 1
          at += 1
          prior = ""
          word = ""
          continue
        }
      }
    }
    note(char)
    at += 1
  }
  return { masked: mask.join(""), strings, templates }
}

/**
 * The top-level argument spans of the call whose `(` stands at `open`, read off a MASKED body so
 * that a bracket inside a string cannot throw the depth off. Null where the call never closes.
 */
export function argumentsOf(masked: string, open: number): readonly Span[] | null {
  const spans: Span[] = []
  let depth = 0
  let start = open + 1
  for (let at = open; at < masked.length; at += 1) {
    const char = masked[at]
    if (char === "(" || char === "[" || char === "{") {
      depth += 1
      continue
    }
    if (char === ")" || char === "]" || char === "}") {
      depth -= 1
      if (depth > 0) continue
      if (char !== ")") return null
      if (spans.length > 0 || masked.slice(start, at).trim() !== "") spans.push({ start, end: at })
      return spans
    }
    if (char === "," && depth === 1) {
      spans.push({ start, end: at })
      start = at + 1
    }
  }
  return null
}
