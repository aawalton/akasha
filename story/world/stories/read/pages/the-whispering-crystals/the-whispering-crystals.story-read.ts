import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theWhisperingCrystals = {
  id: "01a0657d-ada7-7551-964d-40211676105d",
  type: "page-type/story-read",
  slug: "the-whispering-crystals",
  title: "The Whispering Crystals",
  world: "world/the-whispering-crystals",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08MTFM6S5",
      externalLink: "https://www.amazon.com/dp/B08MTFM6S5",
    },
  ],
  rank: "C",
  tags: ["System Apocalypse"],
  unit: "unit/words",
} as const satisfies StoryRead
