export function matchClosingBrace(source: string, openIdx: number): number {
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
    if (c === "{") depth += 1
    else if (c === "}") {
      depth -= 1
      if (depth === 0) return i
    }
    i += 1
  }
  return -1
}

export function skipStringLiteral(source: string, startIdx: number, quote: string): number {
  let i = startIdx + 1
  const n = source.length
  while (i < n) {
    const ch = source[i]
    if (ch === "\\") {
      i += 2
      continue
    }
    if (ch === quote) return i + 1
    if (quote === "`" && ch === "$" && i + 1 < n && source[i + 1] === "{") {
      const inner = matchClosingBrace(source, i + 1)
      if (inner === -1) return n
      i = inner + 1
      continue
    }
    i += 1
  }
  return n
}

export function stripComments(text: string): string {
  let out = ""
  let i = 0
  while (i < text.length) {
    if (text[i] === "/" && text[i + 1] === "/") {
      while (i < text.length && text[i] !== "\n") i += 1
      continue
    }
    if (text[i] === "/" && text[i + 1] === "*") {
      i += 2
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i += 1
      i += 2
      continue
    }
    out += text[i]
    i += 1
  }
  return out
}
