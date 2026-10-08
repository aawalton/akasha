import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegration = {
  id: "01a06572-95bd-7bf7-9cfd-dfbf227087cd",
  type: "page-type/world-spell",
  slug: "disintegration",
  title: "Disintegration",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
