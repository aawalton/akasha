import { proseOnly } from "../../markdown/markdown.ts"

const LINK = /\]\(([^)]+)\)/g

const SCHEME = /^[a-z][a-z0-9+.-]*:/i

const SLOT = /^\{[^{}]*\}$/

const JOIN = "/"

const UP = ".."

const HERE = "."

export const LINK_RELATION = "link"

export function hrefsIn(body: string): readonly string[] {
  const found: string[] = []
  for (const line of proseOnly(body).split("\n")) {
    for (const match of line.matchAll(LINK)) {
      const href = match[1]
      if (href !== undefined) found.push(href)
    }
  }
  return found
}

export function pathOf(href: string): string | null {
  const said = href.trim()
  if (said === "" || SLOT.test(said)) return null
  const target = said.split("#")[0]?.split("?")[0] ?? ""
  if (target === "" || SCHEME.test(target)) return null
  return target
}

export function walkedFrom(key: string, target: string): string | null {
  const from = target.startsWith(JOIN) ? [] : key.split(JOIN).slice(0, -1)
  const walked: string[] = [...from]
  for (const part of target.replace(/^\//, "").split(JOIN)) {
    if (part === "" || part === HERE) continue
    if (part !== UP) {
      walked.push(part)
      continue
    }
    if (walked.length === 0) return null
    walked.pop()
  }
  return walked.length === 0 ? null : walked.join(JOIN)
}

export function linkTargetsFrom(repo: string, key: string, body: string): readonly string[] {
  const found = new Set<string>()
  for (const href of hrefsIn(body)) {
    const target = pathOf(href)
    if (target === null) continue
    const walked = walkedFrom(key, target)
    if (walked === null || walked === key) continue
    found.add(`${repo}${JOIN}${walked}`)
  }
  return [...found].sort()
}

const QUOTE = /^\s*["\u201c]([^]*\S[^]*)["\u201d]\s*$/

const HEADING = /^#{1,6}\s+(.*?)\s*$/

export type Link = {
  readonly href: string
  readonly text: string | null
  readonly line: number
  readonly target: string | null
  readonly anchor: string | null
  readonly quote: string | null
}

export function anchorOf(href: string): string | null {
  const said = href.trim()
  const hash = said.indexOf("#")
  if (hash < 0) return null
  const anchor = said.slice(hash + 1).split("?")[0] ?? ""
  return anchor === "" ? null : anchor
}

export function quoteOf(text: string | null): string | null {
  return text === null ? null : (QUOTE.exec(text)?.[1] ?? null)
}

export function collapsed(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

export function headingSlugs(body: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of proseOnly(body).split("\n")) {
    const heading = HEADING.exec(line)?.[1]
    if (heading === undefined) continue
    found.add(heading.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s/g, "-"))
  }
  return found
}

export function linksIn(repo: string, key: string, body: string): readonly Link[] {
  const found: Link[] = []
  const raw = body.split("\n")
  proseOnly(body)
    .split("\n")
    .forEach((line, index) => {
      for (const match of line.matchAll(LINK)) {
        const href = match[1]
        if (href === undefined) continue
        const close = match.index ?? 0
        const open = line.lastIndexOf("[", close)
        const source = raw[index] ?? line
        const text = open < 0 ? null : source.slice(open + 1, close)
        const path = pathOf(href)
        const walked = path === null ? null : walkedFrom(key, path)
        found.push({
          href,
          text,
          line: index + 1,
          target: walked === null || walked === key ? null : `${repo}${JOIN}${walked}`,
          anchor: anchorOf(href),
          quote: quoteOf(text),
        })
      }
    })
  return found
}
