import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildCooking = {
  id: "01a10331-b562-7dcd-a9ea-b3bf724b879b",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-cooking",
  title: "Cooking",
  world: "world/hyrule",
  description:
    "Ingredients cooked together in a pot over a fire make a dish that restores hearts and may grant an effect for a time; ingredients that do not go together make Dubious Food.",
} as const satisfies WorldMechanic
