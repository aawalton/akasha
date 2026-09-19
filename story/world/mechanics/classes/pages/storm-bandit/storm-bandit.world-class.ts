import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stormBandit = {
  id: "01a0657e-025f-732a-a5e2-be148402b121",
  type: "page-type/world-class",
  slug: "storm-bandit",
  title: "Storm Bandit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
