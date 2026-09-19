import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drummers = {
  id: "01a0657e-01d5-749d-87d6-fbf45e75e8e2",
  type: "page-type/world-class",
  slug: "drummers",
  title: "Drummers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
