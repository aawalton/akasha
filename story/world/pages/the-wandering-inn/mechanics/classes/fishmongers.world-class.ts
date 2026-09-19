import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fishmongers = {
  id: "01a0657e-01dc-71b7-af96-5061dc11a2f6",
  type: "page-type/world-class",
  slug: "fishmongers",
  title: "Fishmongers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
