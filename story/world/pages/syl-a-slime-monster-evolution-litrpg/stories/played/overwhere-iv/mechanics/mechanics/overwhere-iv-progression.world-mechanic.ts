import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvProgression = {
  id: "01a0ed28-3fb3-7639-958c-6941239b7a8b",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-progression",
  title: "Progression",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "How a person grows: race and class levels, traits, skills, points and Emblems.",
} as const satisfies WorldMechanic
