import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveHyperbole = {
  id: "01a0e9f0-a7e4-74d8-869a-fc0d2abb7066",
  type: "page-type/world-title",
  slug: "super-supportive-hyperbole",
  title: "Hyperbole",
  world: "world/super-supportive",
  description:
    "The nickname for an S-rank the System has upgraded past S to a rank number such as 1.",
} as const satisfies WorldTitle
