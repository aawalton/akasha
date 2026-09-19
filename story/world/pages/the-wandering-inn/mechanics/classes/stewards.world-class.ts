import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stewards = {
  id: "01a0657e-025f-76b8-9a6b-f830feb58fa4",
  type: "page-type/world-class",
  slug: "stewards",
  title: "Stewards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
