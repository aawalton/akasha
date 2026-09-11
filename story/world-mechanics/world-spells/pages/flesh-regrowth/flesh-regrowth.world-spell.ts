import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fleshRegrowth = {
  id: "01a06572-95c4-7177-89e1-552ce1885daf",
  type: "world-spell",
  slug: "flesh-regrowth",
  title: "Flesh Regrowth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
