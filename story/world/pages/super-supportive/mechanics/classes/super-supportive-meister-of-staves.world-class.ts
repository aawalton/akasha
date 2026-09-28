import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfStaves = {
  id: "01a0e9f2-30df-7646-9af0-b5acbeed4cca",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-staves",
  title: "Meister of Staves",
  world: "world/super-supportive",
  description: "A Meister subclass whose weapon is the staff.",
} as const satisfies WorldClass
