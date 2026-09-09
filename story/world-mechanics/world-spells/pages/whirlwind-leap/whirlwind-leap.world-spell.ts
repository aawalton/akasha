import type { WorldSpell } from "../../world-spell.page-type.ts"

export const whirlwindLeap = {
  id: "01a06572-95ea-7a80-941f-f82026f59e08",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "whirlwind-leap",
  title: "Whirlwind Leap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
