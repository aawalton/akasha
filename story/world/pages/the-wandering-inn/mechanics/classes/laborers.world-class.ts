import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const laborers = {
  id: "01a0657e-1384-7262-8b60-9d3f834dcbf3",
  type: "page-type/world-class",
  slug: "laborers",
  title: "Laborers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
