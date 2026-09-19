import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lesserFrostElemental = {
  id: "01a06572-95cd-76b5-9c60-e63f5eaef113",
  type: "page-type/world-spell",
  slug: "lesser-frost-elemental",
  title: "Lesser Frost Elemental",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
