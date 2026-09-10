import type { StoryRead } from "../../story-read.page-type.types.ts"

export const theGoodGuys = {
  id: "01a0657d-ada7-74b8-afb2-fda18c311055",
  pageTypeSlug: "story-read",
  type: "story-read",
  slug: "the-good-guys",
  title: "The Good Guys",
  world: "the-good-guys",
  source: "kindle",
  rank: "B",
  tags: ["Comedy"],
  unit: "words",
} as const satisfies StoryRead
