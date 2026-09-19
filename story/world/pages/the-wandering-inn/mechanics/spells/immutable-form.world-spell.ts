import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const immutableForm = {
  id: "01a06572-95cb-7ec3-9b34-300e1aa3b615",
  type: "page-type/world-spell",
  slug: "immutable-form",
  title: "Immutable Form",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
