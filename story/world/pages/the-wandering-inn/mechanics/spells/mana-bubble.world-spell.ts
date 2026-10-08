import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaBubble = {
  id: "01a06572-95d1-7bfc-9a99-bbad5bc465e2",
  type: "page-type/world-spell",
  slug: "mana-bubble",
  title: "Mana Bubble",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
