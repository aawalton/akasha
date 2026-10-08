import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const growGrass = {
  id: "01a06572-95c7-777e-8656-6d313d46fd9d",
  type: "page-type/world-spell",
  slug: "grow-grass",
  title: "Grow Grass",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
