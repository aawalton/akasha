import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const enlargeSpell = {
  id: "01a06572-95bf-7681-a7e4-65c81de865b8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "enlarge-spell",
  title: "Enlarge Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
