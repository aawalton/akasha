import { z } from "zod"

const DISALLOWED_RE = /[^\p{L}\p{N}\p{M}_ -]/gu

const INLINE_LINK_RE = /!?\[([^\]]*)\]\([^)]*\)/g

const ATX_HEADING_RE = /^ {0,3}(#{1,6})\s+(.*)$/
const CLOSING_SEQUENCE_RE = /\s+#+\s*$/
const FENCE_RE = /^\s*(```|~~~)/
const FRONTMATTER_DELIMITER = "---"

const RegexCaptureGroup2 = z.tuple([z.string(), z.string()]).rest(z.string())

function parseHeadingMatch(m: RegExpExecArray | null): string | null {
  if (m === null) return null
  const [, text] = RegexCaptureGroup2.parse(m.slice(1))
  return text
}

export const slugifyHeading = (headingText: string): string =>
  headingText
    .replace(INLINE_LINK_RE, "$1")
    .trim()
    .toLowerCase()
    .replace(DISALLOWED_RE, "")
    .replace(/ /g, "-")

const maskedLines = (lines: readonly string[]): ReadonlySet<number> => {
  const masked = new Set<number>()
  let start = 0
  if (lines[0]?.trim() === FRONTMATTER_DELIMITER) {
    const close = lines.findIndex((l, i) => i > 0 && l.trim() === FRONTMATTER_DELIMITER)
    if (close !== -1) {
      for (let i = 0; i <= close; i++) masked.add(i)
      start = close + 1
    }
  }
  let inside = false
  for (let i = start; i < lines.length; i++) {
    if (FENCE_RE.test(lines[i] ?? "")) {
      masked.add(i)
      inside = !inside
      continue
    }
    if (inside) masked.add(i)
  }
  return masked
}

export const headingSlugs = (source: string): readonly string[] => {
  const lines = source.split("\n")
  const masked = maskedLines(lines)
  const occurrences = new Map<string, number>()
  const out: string[] = []
  for (let i = 0; i < lines.length; i++) {
    if (masked.has(i)) continue
    const text = parseHeadingMatch(ATX_HEADING_RE.exec(lines[i] ?? ""))
    if (text === null) continue
    const base = slugifyHeading(text.replace(CLOSING_SEQUENCE_RE, ""))
    let slug = base
    while (occurrences.has(slug)) {
      const next = (occurrences.get(base) ?? 0) + 1
      occurrences.set(base, next)
      slug = `${base}-${next}`
    }
    occurrences.set(slug, 0)
    out.push(slug)
  }
  return out
}
