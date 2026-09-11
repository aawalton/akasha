import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const directedSpellWindstormOfKaraz = {
  id: "01a06572-95bd-713b-93ed-36b21f18e8a6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "directed-spell-windstorm-of-karaz",
  title: "Directed Spell: Windstorm of Karaz",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
