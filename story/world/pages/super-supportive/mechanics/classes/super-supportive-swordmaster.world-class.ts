import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveSwordmaster = {
  id: "01a0e9f2-30e0-7ee7-9648-eb9eef46f699",
  type: "page-type/world-class",
  slug: "super-supportive-swordmaster",
  title: "Sword Meister",
  world: "world/super-supportive",
  aliases: ["Swordmaster"],
  description: "A common Meister subclass whose weapon is the sword.",
} as const satisfies WorldClass
