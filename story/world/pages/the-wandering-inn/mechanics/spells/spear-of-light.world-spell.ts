import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spearOfLight = {
  id: "01a06572-95e1-7a96-801a-ff65967804dd",
  type: "page-type/world-spell",
  slug: "spear-of-light",
  title: "Spear of Light",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
