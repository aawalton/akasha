import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveObjectShaper = {
  id: "01a0e9f2-30e0-71bf-998d-c9a71fae7e79",
  type: "page-type/world-class",
  slug: "super-supportive-object-shaper",
  title: "Object Shaper",
  world: "world/super-supportive",
  description:
    "A Shaper subclass that moves and reshapes objects, easier the more crafted the object is.",
} as const satisfies WorldClass
