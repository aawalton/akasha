import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boundSpellInvisibility = {
  id: "01a06572-95b7-7420-82ef-0f4346babfda",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bound-spell-invisibility",
  title: "Bound Spell: Invisibility",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
