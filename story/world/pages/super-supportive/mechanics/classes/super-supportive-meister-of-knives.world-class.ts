import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfKnives = {
  id: "01a0e9f2-30df-737e-b8ca-1a5236937598",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-knives",
  title: "Meister of Knives",
  world: "world/super-supportive",
  aliases: ["knife Meister"],
  description: "A Meister subclass whose weapon is the knife.",
} as const satisfies WorldClass
