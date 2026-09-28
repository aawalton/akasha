import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportivePrimary = {
  id: "01a0e9f0-a7e4-7ca4-b1f2-cf8f4172d6f9",
  type: "page-type/world-title",
  slug: "super-supportive-primary",
  title: "Primary",
  world: "world/super-supportive",
  aliases: ["the First"],
  description: "The title of the most powerful knight.",
} as const satisfies WorldTitle
