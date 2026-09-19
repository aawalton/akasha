import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalAdvisor = {
  id: "01a0657e-0248-7255-a995-f1449047ce8b",
  type: "page-type/world-class",
  slug: "royal-advisor",
  title: "Royal Advisor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
