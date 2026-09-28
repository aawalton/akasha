import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfWands = {
  id: "01a0e9f2-30e0-78d6-8827-e23022e8186a",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-wands",
  title: "Meister of Wands",
  world: "world/super-supportive",
  aliases: ["Meister (Wands)"],
  description: "A Meister subclass that works with wands.",
} as const satisfies WorldClass
