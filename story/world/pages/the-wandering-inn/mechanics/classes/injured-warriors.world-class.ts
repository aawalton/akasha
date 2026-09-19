import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const injuredWarriors = {
  id: "01a0657e-01fc-78ef-9602-bf783edf4771",
  type: "page-type/world-class",
  slug: "injured-warriors",
  title: "Injured Warriors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
