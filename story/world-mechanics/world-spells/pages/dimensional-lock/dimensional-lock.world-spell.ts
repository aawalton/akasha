import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dimensionalLock = {
  id: "01a06572-95bd-727b-8036-77f21a91c109",
  type: "world-spell",
  slug: "dimensional-lock",
  title: "Dimensional Lock",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
