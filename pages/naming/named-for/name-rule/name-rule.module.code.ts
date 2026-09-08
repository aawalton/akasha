import { pageStem } from "../page-stem/page-stem.module.code.ts"

const HOLE = /\{([a-z0-9-]+)\}/g

export type HeldAt = (key: string) => string | null

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
