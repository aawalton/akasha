const DIACRITICS = /[̀-ͯ]/g

const APOSTROPHES = /['’]/g

const NOT_ALPHANUMERIC = /[^A-Za-z0-9]+/g

const EDGE_DASHES = /^-+|-+$/g

const HOLE = /\{([a-z0-9-]+)\}/g

export const STEM_CEILING = 100

/** What a rule's hole is filled from: the text held under a key, or null where nothing is. */
export type HeldAt = (key: string) => string | null

export function pageStem(text: string): string {
  const stem = text
    .normalize("NFKD")
    .replace(DIACRITICS, "")
    .replace(APOSTROPHES, "")
    .replace(NOT_ALPHANUMERIC, "-")
    .replace(EDGE_DASHES, "")
    .toLowerCase()
  return stem.length <= STEM_CEILING ? stem : stem.slice(0, STEM_CEILING).replace(EDGE_DASHES, "")
}

export function holesIn(rule: string): readonly string[] {
  const found: string[] = []
  for (const [, key] of rule.matchAll(HOLE)) {
    if (key !== undefined) found.push(key)
  }
  return found
}

/**
 * The one renderer of a `named-for` rule. An unfilled hole makes the whole render null,
 * so a caller falls through to whatever it names a page by instead; a rule that fills to
 * nothing readable is unfilled too, a page being named by its file's stem.
 */
export function filledBy(rule: string, heldAt: HeldAt): string | null {
  let unfilled = false
  const whole = rule.replace(HOLE, (_all, key: string) => {
    const held = heldAt(key)
    if (held === null) {
      unfilled = true
      return ""
    }
    return held
  })
  if (unfilled) return null
  const stem = pageStem(whole)
  return stem === "" ? null : stem
}

/** The holes to blame where `filledBy` answered null: the ones nothing filled, or all of them. */
export function unfilledIn(rule: string, heldAt: HeldAt): readonly string[] {
  const holes = holesIn(rule)
  const missing = holes.filter((key) => heldAt(key) === null)
  return missing.length > 0 ? missing : holes
}
