import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveShaper = {
  id: "01a0e9f1-6aab-74ce-a172-87c684716b79",
  type: "page-type/world-class",
  slug: "super-supportive-shaper",
  title: "Shaper",
  world: "world/super-supportive",
  aliases: ["Worldshaper"],
  description: "A class that shapes an element as the System defines it, with gestures.",
} as const satisfies WorldClass
