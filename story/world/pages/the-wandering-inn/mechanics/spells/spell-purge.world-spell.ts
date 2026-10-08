import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellPurge = {
  id: "01a06572-95e2-78bb-9ff1-c464e5be76a0",
  type: "page-type/world-spell",
  slug: "spell-purge",
  title: "Spell Purge",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
