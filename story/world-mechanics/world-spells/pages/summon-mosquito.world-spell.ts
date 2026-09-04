import type { WorldSpell } from "../world-spell.page-type.ts"

export const summonMosquito = {
  id: "01a06572-95e4-7660-933b-c71f7e63094b",
  pageTypeSlug: "world-spell",
  slug: "summon-mosquito",
  title: "Summon Mosquito",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldSpell
