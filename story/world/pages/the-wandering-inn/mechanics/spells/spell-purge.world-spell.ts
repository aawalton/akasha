import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellPurge = {
  id: "01a06572-95e2-78bb-9ff1-c464e5be76a0",
  type: "page-type/world-spell",
  slug: "spell-purge",
  title: "Spell Purge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
