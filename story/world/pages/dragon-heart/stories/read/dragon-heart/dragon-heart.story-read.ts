import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const dragonHeart = {
  id: "01a0657d-ada7-72cb-987e-08faacf2646d",
  type: "page-type/story-read",
  slug: "dragon-heart",
  title: "Dragon Heart",
  world: "world/dragon-heart",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07TXD7F8V",
      externalLink: "https://www.amazon.com/dp/B07TXD7F8V",
    },
  ],
  grade: "C",
  tags: ["Cultivation", "Dark"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
