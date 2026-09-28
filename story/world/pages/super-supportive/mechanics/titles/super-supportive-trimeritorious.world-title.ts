import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveTrimeritorious = {
  id: "01a0e9fa-4782-779b-99b9-3dc3f3db7beb",
  type: "page-type/world-title",
  slug: "super-supportive-trimeritorious",
  title: "Trimeritorious",
  world: "world/super-supportive",
  aliases: ["title of distinguishment"],
  description: "A high Artonan title a committee can award a wizard for contributions.",
} as const satisfies WorldTitle
