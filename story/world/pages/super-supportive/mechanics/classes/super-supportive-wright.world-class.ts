import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveWright = {
  id: "01a0e9f2-30e0-7b51-b02b-5cc5b43a9488",
  type: "page-type/world-class",
  slug: "super-supportive-wright",
  title: "Wright",
  world: "world/super-supportive",
  description: "The crafting class, which makes magical items.",
} as const satisfies WorldClass
