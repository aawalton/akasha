import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvInjury = {
  id: "01a0ed28-3fb2-7864-bc16-806773f7e894",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-injury",
  title: "Injury",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Hurt to the body: cuts, bruises, bites, burns, poison and breaks.",
} as const satisfies WorldMechanic
