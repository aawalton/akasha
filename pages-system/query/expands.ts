/**
 * Which page types a query asks about: the one it names, and every page type beneath it where it
 * expands.
 *
 * A FACT ABOUT PAGE TYPES RATHER THAN ABOUT PAGES, so it is worked out once, against what a store
 * read, rather than re-walked at each page.
 *
 * PURE. What each page type extends arrives as an argument. No disk, no page index.
 */

/**
 * What each page type extends, by its own slug: the whole set, as a store read it.
 *
 * A PAGE TYPE EXTENDING NOTHING IS NOT A KEY HERE. `extends-slug: none` and no `extends-slug` at all
 * say one thing — nothing above — and what a query wants is the other direction, so a key standing
 * with nothing under it would only ever be stepped over.
 *
 * THE WHOLE SET RATHER THAN ONE PAGE TYPE'S KIN. Which page types stand beneath another is the
 * answer being worked out from this, so a store handing that in already would have had to walk the
 * tree itself, and would have had to rule on a ring in it, which is a refusal of a query.
 */
export type Extending = ReadonlyMap<string, string>

/** What a refusal says of a ring among page types, in the terms those page types were written in. */
export const cycleAmong = (ring: readonly string[]): string =>
  `a cycle among the page types ${ring.map((slug) => `\`${slug}\``).join(", ")}`

/**
 * Which page types extend each one, worked out once rather than scanned again at every step down.
 *
 * SORTED, so that one page type's family reads the same twice. What is handed in was gathered by a
 * walk of a disk, and a disk's order is its own.
 */
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

/** A page type and everything beneath it, or the ring standing in the way of saying what that is. */
export type Family = { readonly family: readonly string[] } | { readonly ring: readonly string[] }

/**
 * The page type named and every page type beneath it, the named one first.
 *
 * A RING IS ANSWERED RATHER THAN WALKED. `extends-slug` should stand a tree and nothing here can
 * make it one, so a page type met twice on one way down is handed back as the ring it closes, as a
 * page type's formulas hand back the ring they run round. Walking it would hang, and stopping at
 * the repeat would answer a family that leaves nobody out and means nothing.
 *
 * A RING IS ONLY EVER MET FROM INSIDE IT. A page type extends at most one page type, so nothing
 * outside a ring stands beneath any member of one: a query expanding a page type that stands in no
 * ring cannot reach one, and is not refused for a ring elsewhere in the corpus. That is the same
 * scope a page type's own formulas are held to, where the cycle refused is the one it runs round.
 *
 * A PAGE TYPE BENEATH DECLARING NOTHING NEW IS STILL BENEATH. Nothing here reads a declaration: one
 * page type extending another and adding not one key is a kind of it, and its pages are asked for.
 */
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
