import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetwalkers = {
  id: "01a0657e-0261-7903-a6cd-67b7d3292ce5",
  type: "page-type/world-class",
  slug: "streetwalkers",
  title: "Streetwalkers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
