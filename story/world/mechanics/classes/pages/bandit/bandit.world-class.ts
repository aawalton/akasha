import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bandit = {
  id: "01a0657e-01b0-75e7-a58f-33e745c77249",
  type: "page-type/world-class",
  slug: "bandit",
  title: "Bandit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
