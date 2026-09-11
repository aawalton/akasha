import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pillarOfLighting = {
  id: "01a06572-95db-77f8-b2ea-5021950b849f",
  type: "world-spell",
  slug: "pillar-of-lighting",
  title: "Pillar of Lighting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
