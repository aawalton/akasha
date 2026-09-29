import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overwhereIvSorcerer = {
  id: "01a0ed30-4be7-77e3-87bb-a3014f047207",
  type: "page-type/world-class",
  slug: "overwhere-iv-sorcerer",
  title: "Sorcerer",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "An intermediate class for casters of many elements, none of them pure.",
  evolvesFromSlugs: ["world-class/overwhere-iv-mage"],
} as const satisfies WorldClass
