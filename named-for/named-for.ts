const DIACRITICS = /[̀-ͯ]/g

const APOSTROPHES = /['’]/g

const NOT_ALPHANUMERIC = /[^A-Za-z0-9]+/g

const EDGE_DASHES = /^-+|-+$/g

const HOLE = /\{([a-z0-9-]+)\}/g

export const STEM_CEILING = 100

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

export function unfilledIn(rule: string, heldAt: HeldAt): readonly string[] {
  const holes = holesIn(rule)
  const missing = holes.filter((key) => heldAt(key) === null)
  return missing.length > 0 ? missing : holes
}
