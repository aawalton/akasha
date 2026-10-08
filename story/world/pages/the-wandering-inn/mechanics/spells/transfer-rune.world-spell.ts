import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const transferRune = {
  id: "01a06572-95e7-7ba1-93e1-20ff369a56a5",
  type: "page-type/world-spell",
  slug: "transfer-rune",
  title: "Transfer Rune",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
