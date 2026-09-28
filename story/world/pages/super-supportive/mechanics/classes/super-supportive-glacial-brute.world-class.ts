import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveGlacialBrute = {
  id: "01a0e9f5-fdeb-7083-aa52-cae4e1875081",
  type: "page-type/world-class",
  slug: "super-supportive-glacial-brute",
  title: "Glacial Brute",
  world: "world/super-supportive",
  description: "A Brute subclass among the environmental Brutes.",
} as const satisfies WorldClass
