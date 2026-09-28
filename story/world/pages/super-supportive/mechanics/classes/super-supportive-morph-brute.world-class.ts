import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMorphBrute = {
  id: "01a0e9f1-6aab-71cf-9608-8a77663a1aec",
  type: "page-type/world-class",
  slug: "super-supportive-morph-brute",
  title: "Morph Brute",
  world: "world/super-supportive",
  aliases: ["Morph"],
  description: "The shapeshifter version of the Brute class.",
} as const satisfies WorldClass
