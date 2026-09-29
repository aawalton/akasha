import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overwhereIvWarrior = {
  id: "01a0ed30-4be7-701e-9c22-2e6a668de0a2",
  type: "page-type/world-class",
  slug: "overwhere-iv-warrior",
  title: "Warrior",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A basic class for those who fight with weapons and armour.",
} as const satisfies WorldClass
