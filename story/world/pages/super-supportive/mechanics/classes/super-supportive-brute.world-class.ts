import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveBrute = {
  id: "01a0e9f1-6aab-7302-b629-3f7d4b31ce54",
  type: "page-type/world-class",
  slug: "super-supportive-brute",
  title: "Brute",
  world: "world/super-supportive",
  description:
    "A physical class of body-modifying powers with few spells, tightly focused skills and many foundation points.",
} as const satisfies WorldClass
