import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const plumbers = {
  id: "01a06586-0a0a-7bfe-bd92-2a6febdcec68",
  type: "page-type/world-class",
  slug: "plumbers",
  title: "Plumbers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
