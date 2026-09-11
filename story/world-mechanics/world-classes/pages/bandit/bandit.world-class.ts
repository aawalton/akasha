import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bandit = {
  id: "01a0657e-01b0-75e7-a58f-33e745c77249",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "bandit",
  title: "Bandit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
