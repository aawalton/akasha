import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const towerAndTheStarJester = {
  id: "01a1033f-b3b4-7fed-8e39-039ebae11819",
  type: "page-type/world-class",
  slug: "tower-and-the-star-jester",
  title: "Jester",
  world: "world/tower-and-the-star",
  description:
    "A disruptor with random effects, with Chaos Grenades and skills such as Stumble and Pattern Break.",
} as const satisfies WorldClass
