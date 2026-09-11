import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const synchronizeSpell = {
  id: "01a06572-95e5-7a9c-bb49-2241a0a05ed4",
  type: "world-spell",
  slug: "synchronize-spell",
  title: "Synchronize Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
