import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveCrossbowMeister = {
  id: "01a0e9f2-30df-7c83-9782-5d0d59bd5292",
  type: "page-type/world-class",
  slug: "super-supportive-crossbow-meister",
  title: "Crossbow Meister",
  world: "world/super-supportive",
  description: "A Meister subclass whose weapon is the crossbow.",
} as const satisfies WorldClass
