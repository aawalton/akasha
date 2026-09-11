import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const incinerationRay = {
  id: "01a06572-95cb-76aa-b90b-cce979c49ea6",
  type: "world-spell",
  slug: "incineration-ray",
  title: "Incineration Ray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
