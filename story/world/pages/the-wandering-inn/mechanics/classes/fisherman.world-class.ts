import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fisherman = {
  id: "01a0657e-01dc-7731-98af-6c515fdd988c",
  type: "page-type/world-class",
  slug: "fisherman",
  title: "Fisherman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
