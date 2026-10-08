import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceArmor = {
  id: "01a06572-95c9-7926-810d-12c55f7ccbe3",
  type: "page-type/world-spell",
  slug: "ice-armor",
  title: "Ice Armor",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
