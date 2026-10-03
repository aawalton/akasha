import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const towerAndTheStarArtificer = {
  id: "01a1033f-b3b4-7ddb-8bde-9f5549d5eee5",
  type: "page-type/world-class",
  slug: "tower-and-the-star-artificer",
  title: "Artificer",
  world: "world/tower-and-the-star",
  description:
    "A crafter who makes and reinforces gear in the field, with the Artificer's Workframe and skills such as Quick Craft and Reinforcement.",
} as const satisfies WorldClass
