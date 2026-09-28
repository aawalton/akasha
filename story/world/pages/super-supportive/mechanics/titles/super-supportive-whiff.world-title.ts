import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveWhiff = {
  id: "01a0e9f5-fdee-7609-a32e-63728fa69bb2",
  type: "page-type/world-title",
  slug: "super-supportive-whiff",
  title: "whiff",
  world: "world/super-supportive",
  aliases: ["whiffs"],
  description: "A slang name for a child of Avowed who is never selected.",
} as const satisfies WorldTitle
