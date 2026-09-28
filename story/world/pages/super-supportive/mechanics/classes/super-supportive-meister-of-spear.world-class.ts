import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfSpear = {
  id: "01a0e9f2-30df-7e29-bba6-dc23fdf85ea0",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-spear",
  title: "Spear Meister",
  world: "world/super-supportive",
  aliases: ["spear"],
  description: "A Meister subclass whose weapon is the spear.",
} as const satisfies WorldClass
