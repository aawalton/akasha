import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const townGuards = {
  id: "01a06586-0a69-7c76-8c78-cab9fe769bf7",
  type: "world-class",
  slug: "town-guards",
  title: "Town Guards",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
