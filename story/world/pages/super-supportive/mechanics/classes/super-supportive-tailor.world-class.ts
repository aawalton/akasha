import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveTailor = {
  id: "01a0e9f2-9e34-77e6-96b0-38834dc7f194",
  type: "page-type/world-class",
  slug: "super-supportive-tailor",
  title: "Tailor",
  world: "world/super-supportive",
  description: "A rare class.",
} as const satisfies WorldClass
