import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveAquaticBrute = {
  id: "01a0e9f1-6aaa-7643-930c-5d7a7721fa28",
  type: "page-type/world-class",
  slug: "super-supportive-aquatic-brute",
  title: "Aquatic Brute",
  world: "world/super-supportive",
  aliases: ["Aqua Brute", "Aquatic"],
  description:
    "An environmental Brute subclass that breathes underwater and endures pressure and temperature extremes.",
} as const satisfies WorldClass
