import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hexEater = {
  id: "01a06572-95c8-751f-9241-4449d2f35115",
  type: "page-type/world-spell",
  slug: "hex-eater",
  title: "Hex Eater",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
