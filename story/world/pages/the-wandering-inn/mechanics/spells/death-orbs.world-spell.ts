import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deathOrbs = {
  id: "01a06572-95bb-76af-89f4-9ac09cd86a24",
  type: "page-type/world-spell",
  slug: "death-orbs",
  title: "Death Orbs",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
