import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfCudgel = {
  id: "01a0e9f2-30df-78fd-8cb4-8668e9b0a7da",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-cudgel",
  title: "Meister of Cudgel",
  world: "world/super-supportive",
  aliases: ["Cudgel Meister"],
  description: "A Meister subclass whose weapon is the club.",
} as const satisfies WorldClass
