import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sheepAssassin = {
  id: "01a0657e-0254-7ed8-89b9-10c1a194aa7f",
  type: "page-type/world-class",
  slug: "sheep-assassin",
  title: "Sheep Assassin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
