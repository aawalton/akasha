import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sneakThief = {
  id: "01a06586-0a44-7ac6-b750-46a41c71c7e9",
  type: "page-type/world-class",
  slug: "sneak-thief",
  title: "Sneak Thief",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
