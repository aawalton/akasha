function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function exclusionLookahead(old: string, next: string, terminator: string): string {
  if (!next.startsWith(`${old}/`)) return ""
  const extra = next.slice(old.length + 1)
  return `(?!/${escapeRegex(extra)}(?=${terminator}))`
}

export function applyPathRename(
  contents: string,
  old: string,
  next: string
): { text: string; count: number } {
  if (old === next) return { text: contents, count: 0 }
  const escaped = escapeRegex(old)
  const term = `$|[/"'\`\\s,)\\]}>]`
  const skip = exclusionLookahead(old, next, term)
  const pattern = new RegExp(`${escaped}${skip}(?=${term})`, "g")
  let count = 0
  const text = contents.replace(pattern, () => {
    count += 1
    return next
  })
  return { text, count }
}

export function applyBoundaryMatch(
  contents: string,
  old: string,
  next: string
): { text: string; count: number } {
  if (old === next) return { text: contents, count: 0 }
  const escaped = escapeRegex(old)
  const term = `/|$|[^A-Za-z0-9_\\-/]`
  const skip = exclusionLookahead(old, next, term)
  const pattern = new RegExp(`(^|[^A-Za-z0-9_\\-/@])${escaped}${skip}(?=${term})`, "gm")
  let count = 0
  const text = contents.replace(pattern, (_match, lead: string) => {
    count += 1
    return `${lead}${next}`
  })
  return { text, count }
}
