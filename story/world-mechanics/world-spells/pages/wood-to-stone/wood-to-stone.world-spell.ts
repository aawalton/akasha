import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const woodToStone = {
  id: "01a06572-95ea-76cc-aca8-10ee39f2a7c5",
  type: "world-spell",
  slug: "wood-to-stone",
  title: "Wood to Stone",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
