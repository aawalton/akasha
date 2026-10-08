import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const darknessArrow = {
  id: "01a06572-95bb-728a-9151-40387d324faf",
  type: "page-type/world-spell",
  slug: "darkness-arrow",
  title: "Darkness Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
