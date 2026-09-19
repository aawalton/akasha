import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seer = {
  id: "01a06586-0a2e-78b2-bf5a-4e398c36208d",
  type: "page-type/world-class",
  slug: "seer",
  title: "Seer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
