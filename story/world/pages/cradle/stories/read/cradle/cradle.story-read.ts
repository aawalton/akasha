import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const cradle = {
  id: "01a0657d-ada7-7b5b-b4eb-6e7096feaed5",
  type: "page-type/story-read",
  slug: "cradle",
  title: "Cradle",
  world: "world/cradle",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0753FP6SP",
      externalLink: "https://www.amazon.com/dp/B0753FP6SP",
    },
  ],
  grade: "A",
  tags: ["Cultivation", "System World"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
