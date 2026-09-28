import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveShaperOfLife = {
  id: "01a0e9f1-6aab-7997-ad32-34a2ff17abb9",
  type: "page-type/world-class",
  slug: "super-supportive-shaper-of-life",
  title: "Shaper of Life",
  world: "world/super-supportive",
  aliases: ["Life Shaper"],
  description: "A Shaper subclass that shapes living things such as plants.",
} as const satisfies WorldClass
