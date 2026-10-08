import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const bushidoOnline = {
  id: "01a0657d-ada7-7bf6-afc7-afc7fee36604",
  type: "page-type/story-read",
  slug: "bushido-online",
  title: "Bushido Online",
  world: "world/bushido-online",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07959MGTF",
      externalLink: "https://www.amazon.com/dp/B07959MGTF",
    },
  ],
  grade: "C",
  tags: ["VRMMO"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
