import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveWaterShaper = {
  id: "01a0e9f1-6aac-731f-99bb-48c767247981",
  type: "page-type/world-class",
  slug: "super-supportive-water-shaper",
  title: "Water Shaper",
  world: "world/super-supportive",
  aliases: ["water-shaping"],
  description: "A Shaper subclass that shapes water.",
} as const satisfies WorldClass
