import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dispel = {
  id: "01a06572-95be-7043-ad7c-94786ec8aef1",
  type: "page-type/world-spell",
  slug: "dispel",
  title: "Dispel",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
