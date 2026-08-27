export interface Literal {
  readonly text: string
  readonly line: number
  readonly start: number
}

interface MaskedSource {
  readonly masked: string
  readonly literals: readonly Literal[]
}

interface LiteralOpener {
  readonly openLength: number
  readonly terminator: string
  readonly escapePrefix: string
  readonly multiline: boolean
}

function openerAt(text: string, index: number): LiteralOpener | undefined {
  let hashes = 0
  while (text[index + hashes] === "#") hashes += 1
  const quoteAt = index + hashes
  if (text[quoteAt] !== '"') return undefined

  const pad = "#".repeat(hashes)
  const multiline = text[quoteAt + 1] === '"' && text[quoteAt + 2] === '"'
  const quote = multiline ? '"""' : '"'
  return {
    openLength: hashes + quote.length,
    terminator: `${quote}${pad}`,
    escapePrefix: `\\${pad}`,
    multiline,
  }
}

interface Consumed {
  readonly next: number
  readonly newlines: number
  readonly literal: Literal
  readonly masked: string
}

function consumeDelimited(
  text: string,
  index: number,
  opener: LiteralOpener
): Consumed | undefined {
  const interior: string[] = []
  const masked: string[] = [text.slice(index, index + opener.openLength)]
  let newlines = 0
  let i = index + opener.openLength

  while (i < text.length) {
    if (text.startsWith(opener.terminator, i)) {
      masked.push(opener.terminator)
      return {
        next: i + opener.terminator.length,
        newlines,
        literal: { text: interior.join(""), line: 0, start: index },
        masked: masked.join(""),
      }
    }
    const ch = text[i] ?? ""
    if (ch === "\n") {
      if (!opener.multiline) return undefined
      interior.push("\n")
      masked.push("\n")
      newlines += 1
      i += 1
      continue
    }
    if (text.startsWith(opener.escapePrefix, i)) {
      const span = opener.escapePrefix.length + 1
      interior.push(text.slice(i, i + span))
      masked.push(" ".repeat(span))
      i += span
      continue
    }
    interior.push(ch)
    masked.push(" ")
    i += 1
  }
  return undefined
}

export function maskSource(text: string): MaskedSource {
  const out: string[] = []
  const literals: Literal[] = []
  let line = 1
  let i = 0

  while (i < text.length) {
    const ch = text[i] ?? ""

    if (ch === "\n") {
      out.push(ch)
      line += 1
      i += 1
      continue
    }

    if (ch === '"' || ch === "#") {
      const opener = openerAt(text, i)
      if (opener !== undefined && opener.openLength > 1) {
        const consumed = consumeDelimited(text, i, opener)
        if (consumed !== undefined) {
          out.push(consumed.masked)
          literals.push({ ...consumed.literal, line })
          line += consumed.newlines
          i = consumed.next
          continue
        }
      }
    }

    if (ch === '"') {
      const quoteLine = line
      const start = i
      const interior: string[] = []
      out.push('"')
      i += 1
      while (i < text.length) {
        const c = text[i] ?? ""
        if (c === "\\") {
          interior.push(c, text[i + 1] ?? "")
          out.push(" ", " ")
          i += 2
          continue
        }
        if (c === '"' || c === "\n") break
        interior.push(c)
        out.push(" ")
        i += 1
      }
      if ((text[i] ?? "") === '"') {
        out.push('"')
        i += 1
      }
      literals.push({ text: interior.join(""), line: quoteLine, start })
      continue
    }

    if (ch === "/" && text[i + 1] === "/") {
      while (i < text.length && text[i] !== "\n") {
        out.push(" ")
        i += 1
      }
      continue
    }

    if (ch === "/" && text[i + 1] === "*") {
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) {
        if (text[i] === "\n") {
          out.push("\n")
          line += 1
        } else out.push(" ")
        i += 1
      }
      out.push(" ", " ")
      i += 2
      continue
    }

    out.push(ch)
    i += 1
  }

  return { masked: out.join(""), literals }
}

export function matchDelimiter(
  masked: string,
  openIndex: number,
  open: string,
  close: string
): number {
  let depth = 0
  for (let i = openIndex; i < masked.length; i++) {
    const c = masked[i]
    if (c === open) depth += 1
    else if (c === close) {
      depth -= 1
      if (depth === 0) return i
    }
  }
  return -1
}

export function literalsInRange(
  literals: readonly Literal[],
  start: number,
  end: number
): readonly Literal[] {
  return literals.filter((l) => l.start >= start && l.start < end)
}

export function matchEnds(masked: string, pattern: RegExp): readonly number[] {
  const ends: number[] = []
  for (const m of masked.matchAll(pattern)) {
    if (m.index !== undefined) ends.push(m.index + m[0].length)
  }
  return ends
}
