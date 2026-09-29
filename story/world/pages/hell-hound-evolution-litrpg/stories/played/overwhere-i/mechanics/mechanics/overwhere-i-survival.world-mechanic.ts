import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereISurvival = {
  id: "01a0ed1f-ad87-70a8-b481-c7473e85ca93",
  type: "page-type/world-mechanic",
  slug: "overwhere-i-survival",
  title: "Survival",
  world: "world/hell-hound-evolution-litrpg",
  description: "Hunger, thirst, cold, weariness and sleep.",
} as const satisfies WorldMechanic
