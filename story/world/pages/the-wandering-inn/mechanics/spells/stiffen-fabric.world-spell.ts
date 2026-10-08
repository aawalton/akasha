import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stiffenFabric = {
  id: "01a06572-95e3-73c7-9878-7dd9ec08ac91",
  type: "page-type/world-spell",
  slug: "stiffen-fabric",
  title: "Stiffen Fabric",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
