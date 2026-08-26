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
