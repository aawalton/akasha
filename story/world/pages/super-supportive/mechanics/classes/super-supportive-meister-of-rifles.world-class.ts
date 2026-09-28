import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfRifles = {
  id: "01a0e9f2-30df-7414-a7b9-168fc4965cad",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-rifles",
  title: "Meister of Rifles",
  world: "world/super-supportive",
  description: "A Meister subclass whose weapon is the rifle.",
} as const satisfies WorldClass
