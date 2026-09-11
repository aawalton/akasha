import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const ranger = {
  id: "01a06586-0a1d-7327-bb29-a548eed5cc1b",
  type: "world-class",
  slug: "ranger",
  title: "Ranger",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
