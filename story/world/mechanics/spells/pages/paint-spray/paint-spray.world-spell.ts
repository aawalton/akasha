import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paintSpray = {
  id: "01a06572-95da-71ad-98ea-3d0de329cd55",
  type: "page-type/world-spell",
  slug: "paint-spray",
  title: "Paint Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
