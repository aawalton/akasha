export interface RawLine {
  readonly stripped: string
  readonly indent: number
  readonly blank: boolean
  readonly lineNumber: number
}

export interface DocSpan {
  readonly startIndex: number
  readonly endIndex: number
  readonly startLine: number
  readonly endLine: number
}

export interface ScanError {
  readonly line: number
  readonly message: string
}

export function stripComment(line: string): string {
  let inSingle = false
  let inDouble = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === "'" && !inDouble) inSingle = !inSingle
    else if (ch === '"' && !inSingle) inDouble = !inDouble
    else if (ch === "#" && !inSingle && !inDouble) return line.slice(0, i).trimEnd()
  }
  return line.trimEnd()
}

export function unquote(value: string): string {
  const trimmed = value.trim()
  if (trimmed.length >= 2) {
    const first = trimmed[0]
    const last = trimmed[trimmed.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return trimmed.slice(1, -1)
    }
  }
  return trimmed
}

export function parseMappingLine(
  stripped: string
): { key: string; value: string | undefined } | null {
  if (stripped.startsWith("- ") || stripped === "-") return null

  let i = 0
  let inSingle = false
  let inDouble = false
  while (i < stripped.length) {
    const ch = stripped[i]
    if (ch === "'" && !inDouble) inSingle = !inSingle
    else if (ch === '"' && !inSingle) inDouble = !inDouble
    else if (ch === ":" && !inSingle && !inDouble) {
      const next = stripped[i + 1]
      if (next === undefined || next === " " || next === "\t") {
        const keyRaw = stripped.slice(0, i).trim()
        const valueRaw = stripped.slice(i + 1).trim()
        const key = unquote(keyRaw)
        const value = valueRaw.length === 0 ? undefined : valueRaw
        if (key.length === 0) return null
        return { key, value }
      }
    }
    i++
  }
  return null
}

export function lex(text: string): readonly RawLine[] {
  const out: RawLine[] = []
  const rawLines = text.split("\n")
  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i]
    if (raw === undefined) continue
    const stripped = stripComment(raw)
    const trimmedLeft = stripped.replace(/^\s+/, "")
    const indent = stripped.length - trimmedLeft.length
    const blank = trimmedLeft.length === 0
    out.push({ stripped, indent, blank, lineNumber: i + 1 })
  }
  return out
}

export function isDocSeparator(rawLine: string): boolean {
  return rawLine.trim() === "---"
}

export function splitDocs(lines: readonly RawLine[], rawText: string): readonly DocSpan[] {
  const rawLines = rawText.split("\n")
  const spans: { startIndex: number; endIndex: number }[] = []
  let cursor = 0
  for (let i = 0; i < lines.length; i++) {
    const rawLine = rawLines[i]
    if (rawLine !== undefined && isDocSeparator(rawLine)) {
      spans.push({ startIndex: cursor, endIndex: i })
      cursor = i + 1
    }
  }
  spans.push({ startIndex: cursor, endIndex: lines.length })

  const out: DocSpan[] = []
  for (const span of spans) {
    let firstContent = -1
    let lastContent = -1
    for (let i = span.startIndex; i < span.endIndex; i++) {
      const ln = lines[i]
      if (ln === undefined) continue
      if (!ln.blank) {
        if (firstContent === -1) firstContent = i
        lastContent = i
      }
    }
    if (firstContent === -1) continue
    const firstLine = lines[firstContent]
    const lastLine = lines[lastContent]
    if (firstLine === undefined || lastLine === undefined) continue
    out.push({
      startIndex: firstContent,
      endIndex: lastContent + 1,
      startLine: firstLine.lineNumber,
      endLine: lastLine.lineNumber,
    })
  }
  return out
}

export function childBlock(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  parentKey: string,
  parentIndent: number
): { startIndex: number; endIndex: number } | null {
  let parentLine = -1
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== parentIndent) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key === parentKey) {
      parentLine = i
      break
    }
  }
  if (parentLine === -1) return null

  let childIndent = -1
  let blockStart = -1
  for (let i = parentLine + 1; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent <= parentIndent) break
    if (childIndent === -1) {
      childIndent = ln.indent
      blockStart = i
    }
  }
  if (blockStart === -1) return null

  let blockEnd = span.endIndex
  for (let i = blockStart; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent <= parentIndent) {
      blockEnd = i
      break
    }
  }
  return { startIndex: blockStart, endIndex: blockEnd }
}

export function resolveMappingPath(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  path: readonly string[]
): { startIndex: number; endIndex: number; indent: number } | null {
  let currentSpan = { startIndex: span.startIndex, endIndex: span.endIndex }
  let currentIndent = 0
  for (const segment of path) {
    const block = childBlock(lines, currentSpan, segment, currentIndent)
    if (block === null) return null
    currentSpan = { startIndex: block.startIndex, endIndex: block.endIndex }
    const blockLine = lines[block.startIndex]
    if (blockLine === undefined) return null
    currentIndent = blockLine.indent
  }
  return {
    startIndex: currentSpan.startIndex,
    endIndex: currentSpan.endIndex,
    indent: currentIndent,
  }
}
