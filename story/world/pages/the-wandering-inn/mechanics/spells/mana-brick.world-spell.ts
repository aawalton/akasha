import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaBrick = {
  id: "01a06572-95d1-7e24-9a52-b1c0cd5cfbbe",
  type: "page-type/world-spell",
  slug: "mana-brick",
  title: "Mana Brick",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
