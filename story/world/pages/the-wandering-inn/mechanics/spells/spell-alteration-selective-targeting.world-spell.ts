import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellAlterationSelectiveTargeting = {
  id: "01a06572-95e2-70be-90c5-d6c0535ae301",
  type: "page-type/world-spell",
  slug: "spell-alteration-selective-targeting",
  title: "Spell Alteration: Selective Targeting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
