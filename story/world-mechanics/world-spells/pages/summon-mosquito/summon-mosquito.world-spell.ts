import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonMosquito = {
  id: "01a06572-95e4-7660-933b-c71f7e63094b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "summon-mosquito",
  title: "Summon Mosquito",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
