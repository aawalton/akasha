import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const secondAgeOfRetha = {
  id: "01a0657d-ada7-7854-adc8-52ad7b7ae7b4",
  type: "page-type/story-read",
  slug: "second-age-of-retha",
  title: "Second Age of Retha",
  world: "world/second-age-of-retha",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B077LJWQGP",
      externalLink: "https://www.amazon.com/dp/B077LJWQGP",
    },
  ],
  following: true,
  unit: "unit/words",
} as const satisfies StoryRead
