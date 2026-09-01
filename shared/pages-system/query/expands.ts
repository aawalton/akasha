export type Extending = ReadonlyMap<string, string>

export const cycleAmong = (ring: readonly string[]): string =>
  `a cycle among the page types ${ring.map((slug) => `\`${slug}\``).join(", ")}`

const beneath = (extending: Extending): ReadonlyMap<string, readonly string[]> => {
  const under = new Map<string, string[]>()
  for (const [slug, over] of extending) {
    const held = under.get(over)
    if (held === undefined) under.set(over, [slug])
    else held.push(slug)
  }
  for (const held of under.values()) held.sort()
  return under
}

export type Family = { readonly family: readonly string[] } | { readonly ring: readonly string[] }

export const familyOf = (pageType: string, extending: Extending): Family => {
  const under = beneath(extending)
  const family: string[] = []
  const open: string[] = []
  const walk = (slug: string): readonly string[] | null => {
    const standing = open.indexOf(slug)
    if (standing !== -1) return open.slice(standing)
    open.push(slug)
    family.push(slug)
    for (const one of under.get(slug) ?? []) {
      const ring = walk(one)
      if (ring !== null) return ring
    }
    open.pop()
    return null
  }
  const ring = walk(pageType)
  return ring === null ? { family } : { ring }
}
