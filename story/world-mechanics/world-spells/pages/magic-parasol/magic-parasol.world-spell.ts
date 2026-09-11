import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicParasol = {
  id: "01a06572-95d1-70c1-9908-b4ab6df4999c",
  type: "world-spell",
  slug: "magic-parasol",
  title: "Magic Parasol",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
