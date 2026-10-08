import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenBulwarks = {
  id: "01a06572-95be-7d9f-ad15-6b20f7b4da4d",
  type: "page-type/world-spell",
  slug: "earthen-bulwarks",
  title: "Earthen Bulwarks",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
