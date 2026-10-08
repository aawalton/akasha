import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const enlargeSpell = {
  id: "01a06572-95bf-7681-a7e4-65c81de865b8",
  type: "page-type/world-spell",
  slug: "enlarge-spell",
  title: "Enlarge Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
