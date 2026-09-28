import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveFigurinist = {
  id: "01a0e9f2-9e33-74e6-bc41-6cb50b04df7f",
  type: "page-type/world-class",
  slug: "super-supportive-figurinist",
  title: "Figurinist",
  world: "world/super-supportive",
  description: "An ultra-rare class that mind-controls a single small figure like a doll.",
} as const satisfies WorldClass
