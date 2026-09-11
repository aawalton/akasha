import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const everburningBlaze = {
  id: "01a06572-95bf-7ecd-a73c-e91b055c8328",
  type: "world-spell",
  slug: "everburning-blaze",
  title: "Everburning Blaze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
