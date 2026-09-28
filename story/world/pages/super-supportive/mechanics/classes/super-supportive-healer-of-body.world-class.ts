import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveHealerOfBody = {
  id: "01a0e9f2-9e34-7e45-afcc-c8f3465a6d71",
  type: "page-type/world-class",
  slug: "super-supportive-healer-of-body",
  title: "Healer of Body",
  world: "world/super-supportive",
  description: "A Healer subclass that mends the body.",
} as const satisfies WorldClass
