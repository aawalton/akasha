import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfBow = {
  id: "01a0e9f2-30df-7bd6-a29c-9278d06c73bc",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-bow",
  title: "Meister of Bow",
  world: "world/super-supportive",
  aliases: ["Bow Meister"],
  description: "A Meister subclass whose weapon is the bow.",
} as const satisfies WorldClass
