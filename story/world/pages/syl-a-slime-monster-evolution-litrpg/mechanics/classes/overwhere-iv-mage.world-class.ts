import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overwhereIvMage = {
  id: "01a0ed30-4be6-72cf-bdb5-d1f5a6b38b00",
  type: "page-type/world-class",
  slug: "overwhere-iv-mage",
  title: "Mage",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A basic class for those who fight with spells.",
  evolvesToSlugs: ["world-class/overwhere-iv-sorcerer"],
} as const satisfies WorldClass
