import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIInjury = {
  id: "01a0ed1f-ad87-7a7e-b76a-fda098ef383b",
  type: "page-type/world-mechanic",
  slug: "overwhere-i-injury",
  title: "Injury",
  world: "world/hell-hound-evolution-litrpg",
  description: "Wounds, how bad they are, and how they heal.",
} as const satisfies WorldMechanic
