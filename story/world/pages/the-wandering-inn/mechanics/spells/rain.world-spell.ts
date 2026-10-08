import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rain = {
  id: "01a06572-95dc-745a-8b2f-bd3f0fcea819",
  type: "page-type/world-spell",
  slug: "rain",
  title: "Rain",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
