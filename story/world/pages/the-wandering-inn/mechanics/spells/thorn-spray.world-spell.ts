import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thornSpray = {
  id: "01a06572-95e6-78a7-93c3-b58637325a30",
  type: "page-type/world-spell",
  slug: "thorn-spray",
  title: "Thorn Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
