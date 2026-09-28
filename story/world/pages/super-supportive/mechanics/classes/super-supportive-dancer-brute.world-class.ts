import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveDancerBrute = {
  id: "01a0e9f1-6aab-7e32-8fd8-d6c19f44d05f",
  type: "page-type/world-class",
  slug: "super-supportive-dancer-brute",
  title: "Dancer Brute",
  world: "world/super-supportive",
  aliases: ["Graceful Brute"],
  description: "An unofficial Brute build for dance.",
} as const satisfies WorldClass
