import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellPurge = {
  id: "01a06572-95e2-78bb-9ff1-c464e5be76a0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spell-purge",
  title: "Spell Purge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
