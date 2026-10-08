import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overwhereIvMage = {
  id: "01a0ed30-4be6-72cf-bdb5-d1f5a6b38b00",
  type: "page-type/world-class",
  slug: "overwhere-iv-mage",
  title: "Mage",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A basic class for those who fight with spells.",
  evolvesToSlugs: ["world-class/overwhere-iv-sorcerer"],
  createdAt: "2026-09-29T12:42:40.486Z",
  updatedAt: "2026-09-29T12:42:43.000Z",
} as const satisfies WorldClass
