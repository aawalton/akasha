import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const riseOfTheDevourer = {
  id: "01a0657d-ada7-73a9-91f2-42fa19396a6e",
  type: "page-type/story-read",
  slug: "rise-of-the-devourer",
  title: "Rise of the Devourer",
  world: "world/rise-of-the-devourer",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CKZJHF29",
      externalLink: "https://www.amazon.com/dp/B0CKZJHF29",
    },
  ],
  rank: "C",
  unit: "unit/words",
} as const satisfies StoryRead
