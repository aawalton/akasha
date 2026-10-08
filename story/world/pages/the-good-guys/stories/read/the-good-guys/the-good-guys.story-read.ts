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
  grade: "B",
  tags: ["Comedy"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
