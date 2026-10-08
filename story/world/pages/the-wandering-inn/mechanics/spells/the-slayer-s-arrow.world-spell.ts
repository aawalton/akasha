import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const theSlayerSArrow = {
  id: "01a06572-95e6-73ce-a033-c51a368228e7",
  type: "page-type/world-spell",
  slug: "the-slayer-s-arrow",
  title: "The ___slayer’s Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
