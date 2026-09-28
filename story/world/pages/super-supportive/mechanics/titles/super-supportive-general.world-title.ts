import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveGeneral = {
  id: "01a0e9f0-a7e4-7c0e-8857-dca2144697c4",
  type: "page-type/world-title",
  slug: "super-supportive-general",
  title: "General",
  world: "world/super-supportive",
  description: "A numbered title given to knights.",
} as const satisfies WorldTitle
