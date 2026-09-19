import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const growGrass = {
  id: "01a06572-95c7-777e-8656-6d313d46fd9d",
  type: "page-type/world-spell",
  slug: "grow-grass",
  title: "Grow Grass",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
