import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const marine = {
  id: "01a0657e-139d-7e0d-8bd1-94de4dcb9608",
  type: "world-class",
  slug: "marine",
  title: "Marine",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
