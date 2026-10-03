import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fairweatherAlchemist = {
  id: "01a102af-305c-7a80-9bc9-b67fa4b4bf5a",
  type: "page-type/world-class",
  slug: "fairweather-alchemist",
  title: "Alchemist",
  world: "world/fairweather",
  description:
    "A class that brews potions, salves and powders by pouring power into what it mixes.",
} as const satisfies WorldClass
