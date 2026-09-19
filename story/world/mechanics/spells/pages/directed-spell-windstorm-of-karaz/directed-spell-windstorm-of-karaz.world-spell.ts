import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const directedSpellWindstormOfKaraz = {
  id: "01a06572-95bd-713b-93ed-36b21f18e8a6",
  type: "page-type/world-spell",
  slug: "directed-spell-windstorm-of-karaz",
  title: "Directed Spell: Windstorm of Karaz",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
