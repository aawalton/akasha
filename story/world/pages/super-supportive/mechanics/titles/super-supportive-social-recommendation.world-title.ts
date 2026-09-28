import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveSocialRecommendation = {
  id: "01a0e9f5-fded-7cc7-80a4-1acb8c4b7ed6",
  type: "page-type/world-title",
  slug: "super-supportive-social-recommendation",
  title: "Social Recommendation",
  world: "world/super-supportive",
  aliases: ["recommendation"],
  description: "A recommendation listed on an Avowed's real profile.",
} as const satisfies WorldTitle
