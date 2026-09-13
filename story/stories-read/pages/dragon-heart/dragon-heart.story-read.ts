import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const dragonHeart = {
  id: "01a0657d-ada7-72cb-987e-08faacf2646d",
  type: "story-read",
  slug: "dragon-heart",
  title: "Dragon Heart",
  world: "dragon-heart",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07TXD7F8V",
      externalLink: "https://www.amazon.com/dp/B07TXD7F8V",
    },
  ],
  rank: "C",
  tags: ["Cultivation", "Dark"],
  unit: "words",
} as const satisfies StoryRead
