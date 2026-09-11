import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lesserPolymorph = {
  id: "01a06572-95cd-7c9c-b63b-8cb89e31234c",
  type: "world-spell",
  slug: "lesser-polymorph",
  title: "Lesser Polymorph",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
