import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellguard = {
  id: "01a06572-95e2-7992-8673-88429d950b3f",
  type: "page-type/world-spell",
  slug: "spellguard",
  title: "Spellguard",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
