import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theGam3 = {
  id: "01a0657d-ada7-76b1-9333-2d768bb472c5",
  type: "page-type/story-read",
  slug: "the-gam3",
  title: "The Gam3",
  world: "world/the-gam3",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075V2GXKP",
      externalLink: "https://www.amazon.com/dp/B075V2GXKP",
    },
  ],
  grade: "B",
  tags: ["VRMMO"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
