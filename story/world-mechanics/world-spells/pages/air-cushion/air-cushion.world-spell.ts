import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const airCushion = {
  id: "01a06572-95b3-76f2-81bb-a6a6b3631009",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "air-cushion",
  title: "Air Cushion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
