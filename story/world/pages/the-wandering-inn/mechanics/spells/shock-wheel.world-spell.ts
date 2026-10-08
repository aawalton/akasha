import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shockWheel = {
  id: "01a06572-95e0-7dc9-bece-352f27f972db",
  type: "page-type/world-spell",
  slug: "shock-wheel",
  title: "Shock Wheel",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
