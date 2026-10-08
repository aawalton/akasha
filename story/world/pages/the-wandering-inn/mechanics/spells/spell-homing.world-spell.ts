import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellHoming = {
  id: "01a06572-95e2-78f1-b6b5-0fa9683ce49f",
  type: "page-type/world-spell",
  slug: "spell-homing",
  title: "Spell: Homing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
