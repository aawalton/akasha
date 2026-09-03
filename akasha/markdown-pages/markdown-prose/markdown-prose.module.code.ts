const FENCE_RE = /^\s*(```|~~~)/
const INLINE_CODE_RE = /`[^`]*`/g

export function withoutFences(markdown: string): string {
  let fence: string | null = null
  return markdown
    .split("\n")
    .map((line) => {
      const marker = FENCE_RE.exec(line)?.[1]
      if (marker === undefined) return fence === null ? line : ""
      if (fence === null) fence = marker
      else if (marker === fence) fence = null
      return ""
    })
    .join("\n")
}

export function proseOnly(markdown: string): string {
  return withoutFences(markdown)
    .split("\n")
    .map((line) => line.replace(INLINE_CODE_RE, (s) => " ".repeat(s.length)))
    .join("\n")
}

export interface Section {
  readonly depth: number
  readonly title: string
  readonly line: number
  readonly body: string
}

export function sections(markdown: string, depth: number): readonly Section[] {
  const lines = withoutFences(markdown).split("\n")
  const heading = /^(#{1,6}) (.+)$/
  const found: { depth: number; title: string; line: number; from: number }[] = []
  lines.forEach((line, index) => {
    const match = heading.exec(line)
    const hashes = match?.[1]
    const title = match?.[2]
    if (hashes === undefined || title === undefined) return
    found.push({ depth: hashes.length, title: title.trim(), line: index + 1, from: index + 1 })
  })
  const original = markdown.split("\n")
  return found
    .filter((h) => h.depth === depth)
    .map((h) => {
      const next = found.find((o) => o.line > h.line && o.depth <= depth)
      const end = next === undefined ? original.length : next.line - 1
      return {
        depth: h.depth,
        title: h.title,
        line: h.line,
        body: original.slice(h.from, end).join("\n"),
      }
    })
}

export function sectionNamed(body: string, title: string): Section | null {
  return sections(body, 1).find((one) => one.title === title) ?? null
}

export function bullets(body: string): readonly { text: string; line: number }[] {
  const found: { text: string; line: number }[] = []
  withoutFences(body)
    .split("\n")
    .forEach((line, index) => {
      if (/^- /.test(line)) found.push({ text: line, line: index + 1 })
    })
  return found
}
