import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const streetRogue = {
  id: "01a06586-0a5d-77b8-b36f-7c288e2cdff5",
  type: "world-class",
  slug: "street-rogue",
  title: "Street Rogue",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
