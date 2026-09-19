import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellguard = {
  id: "01a06572-95e2-7992-8673-88429d950b3f",
  type: "page-type/world-spell",
  slug: "spellguard",
  title: "Spellguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
