import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfKnuckles = {
  id: "01a0e9f2-30df-7a9d-bbb2-d08ee05361fc",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-knuckles",
  title: "Meister of Knuckles",
  world: "world/super-supportive",
  aliases: ["Knuckle Meister"],
  description: "A Meister subclass that specializes in fist weapons.",
} as const satisfies WorldClass
