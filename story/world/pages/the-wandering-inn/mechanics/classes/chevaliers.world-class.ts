import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chevaliers = {
  id: "01a0657e-01c4-706b-a0a9-5e7b13eea71f",
  type: "page-type/world-class",
  slug: "chevaliers",
  title: "Chevaliers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
