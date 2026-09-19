import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theLegendOfRandidlyGhosthound = {
  id: "01a0657d-ada5-7cb1-95d5-3d35fdc8e985",
  type: "page-type/story-read",
  slug: "the-legend-of-randidly-ghosthound",
  title: "The Legend of Randidly Ghosthound",
  world: "world/the-legend-of-randidly-ghosthound",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "11209",
      externalLink: "https://www.royalroad.com/fiction/11209/the-legend-of-randidly-ghosthound",
    },
  ],
  author: "puddles4263",
  rank: "C",
  following: true,
  externalTags: ["LitRPG", "Action", "Fantasy"],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
