import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import type { MaxLevel } from "akasha/story/world/characters/properties/max-level.computed-property.types.ts"

type Said = {
  readonly claimField?: unknown
  readonly claimValue?: unknown
  readonly epistemic?: unknown
}

type Claimed = { readonly characterClaims?: unknown }

export const LEVEL = "level"

export const ASSERTED = "asserted"

function levelIn(said: Said): number | null {
  if (said.claimField !== LEVEL || said.epistemic !== ASSERTED) return null
  const value = said.claimValue
  if (typeof value !== "string" || value.trim() === "") return null
  const level = Number(value)
  return Number.isFinite(level) ? level : null
}

export function highestLevel(claims: readonly Said[]): number | null {
  let highest: number | null = null
  for (const said of claims) {
    const level = levelIn(said)
    if (level !== null && (highest === null || level > highest)) highest = level
  }
  return highest
}

export const work: Work<Claimed, MaxLevel> = (page) =>
  Array.isArray(page.characterClaims) ? highestLevel(page.characterClaims as readonly Said[]) : null
