import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shockVolt = {
  id: "01a06572-95e0-72dc-b1fc-2287bc31022c",
  type: "page-type/world-spell",
  slug: "shock-volt",
  title: "Shock Volt",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
