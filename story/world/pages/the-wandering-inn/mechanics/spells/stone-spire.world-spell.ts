import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSpire = {
  id: "01a06572-95e3-7b20-a446-3b3b98b3c358",
  type: "page-type/world-spell",
  slug: "stone-spire",
  title: "Stone Spire",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
