import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveGroundShaper = {
  id: "01a0e9f1-6aab-7345-9902-23b011671dab",
  type: "page-type/world-class",
  slug: "super-supportive-ground-shaper",
  title: "Shaper of Ground",
  world: "world/super-supportive",
  aliases: ["Ground Shaper"],
  description: "A Shaper subclass that shapes the Ground element.",
} as const satisfies WorldClass
