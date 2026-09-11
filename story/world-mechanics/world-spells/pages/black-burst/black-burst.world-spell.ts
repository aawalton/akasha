import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blackBurst = {
  id: "01a06572-95b6-7009-a746-333c6d0d26e0",
  type: "world-spell",
  slug: "black-burst",
  title: "Black Burst",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
