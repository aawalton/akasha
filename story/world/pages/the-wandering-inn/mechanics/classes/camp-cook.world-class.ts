import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const campCook = {
  id: "01a0657e-01c1-7e7b-bbe9-ce461d3f4548",
  type: "page-type/world-class",
  slug: "camp-cook",
  title: "Camp Cook",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
