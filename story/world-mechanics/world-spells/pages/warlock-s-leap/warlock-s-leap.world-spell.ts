import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const warlockSLeap = {
  id: "01a06572-95e9-7efa-a352-ba73aeb03be5",
  type: "world-spell",
  slug: "warlock-s-leap",
  title: "Warlock’s Leap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
