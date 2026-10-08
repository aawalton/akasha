import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneskin = {
  id: "01a06572-95e4-7dd8-b640-d796f275a7d9",
  type: "page-type/world-spell",
  slug: "stoneskin",
  title: "Stoneskin",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
