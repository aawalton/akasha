import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stomachOfTheCow = {
  id: "01a06572-95e3-7bce-95ad-192cd11e2c29",
  type: "page-type/world-spell",
  slug: "stomach-of-the-cow",
  title: "Stomach of the Cow",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
