import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const steward = {
  id: "01a06586-0a54-78df-9e6a-b32b63edc60d",
  type: "world-class",
  slug: "steward",
  title: "Steward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
