import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const plaguePustule = {
  id: "01a06572-95db-789e-a127-68294d2d33f5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "plague-pustule",
  title: "Plague Pustule",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
