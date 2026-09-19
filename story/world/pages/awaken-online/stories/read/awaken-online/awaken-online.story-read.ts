import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const awakenOnline = {
  id: "01a0657d-ada7-7d0c-a19b-1a013f5eeae0",
  type: "page-type/story-read",
  slug: "awaken-online",
  title: "Awaken Online",
  world: "world/awaken-online",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CC5NDX",
      externalLink: "https://www.amazon.com/dp/B074CC5NDX",
    },
  ],
  rank: "A",
  following: true,
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
