import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const footballer = {
  id: "01a0657e-01de-73bc-8187-653c2c3ecb6f",
  type: "page-type/world-class",
  slug: "footballer",
  title: "Footballer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
