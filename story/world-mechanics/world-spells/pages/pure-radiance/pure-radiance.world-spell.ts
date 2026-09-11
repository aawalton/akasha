import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pureRadiance = {
  id: "01a06572-95db-776e-b3ed-255ff961113f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "pure-radiance",
  title: "Pure Radiance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
