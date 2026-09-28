import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveQuaternary = {
  id: "01a0e9f0-a7e4-7f94-8501-aa9f54e7a251",
  type: "page-type/world-title",
  slug: "super-supportive-quaternary",
  title: "Quaternary",
  world: "world/super-supportive",
  aliases: ["Fourth General"],
  description: "The title of the fourth knight in rank.",
} as const satisfies WorldTitle
