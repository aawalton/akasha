import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cageOfPallass = {
  id: "01a06572-95b8-7f9a-93de-9c6dc12d2c3a",
  type: "page-type/world-spell",
  slug: "cage-of-pallass",
  title: "Cage of Pallass",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
