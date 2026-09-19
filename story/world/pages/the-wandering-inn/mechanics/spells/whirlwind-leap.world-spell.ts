import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const whirlwindLeap = {
  id: "01a06572-95ea-7a80-941f-f82026f59e08",
  type: "page-type/world-spell",
  slug: "whirlwind-leap",
  title: "Whirlwind Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
