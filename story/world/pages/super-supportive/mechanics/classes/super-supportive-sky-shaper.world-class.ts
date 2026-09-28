import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveSkyShaper = {
  id: "01a0e9f1-6aab-7d45-a1cb-7be6fabc75db",
  type: "page-type/world-class",
  slug: "super-supportive-sky-shaper",
  title: "Sky Shaper",
  world: "world/super-supportive",
  aliases: ["Shaper of Sky"],
  description: "A Shaper subclass that shapes air and weather.",
} as const satisfies WorldClass
