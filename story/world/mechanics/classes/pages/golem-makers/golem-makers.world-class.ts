import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const golemMakers = {
  id: "01a0657e-01e3-7c3a-9379-c9ea2037e96d",
  type: "page-type/world-class",
  slug: "golem-makers",
  title: "Golem Makers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
