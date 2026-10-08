import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibleFireball = {
  id: "01a06572-95cc-74d4-9eb5-93ab0902d74e",
  type: "page-type/world-spell",
  slug: "invisible-fireball",
  title: "Invisible Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
