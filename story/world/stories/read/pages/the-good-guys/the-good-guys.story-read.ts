import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theGoodGuys = {
  id: "01a0657d-ada7-74b8-afb2-fda18c311055",
  type: "page-type/story-read",
  slug: "the-good-guys",
  title: "The Good Guys",
  world: "world/the-good-guys",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07JX4TF1Y",
      externalLink: "https://www.amazon.com/dp/B07JX4TF1Y",
    },
  ],
  rank: "B",
  tags: ["Comedy"],
  unit: "unit/words",
} as const satisfies StoryRead
