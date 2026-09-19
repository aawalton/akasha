import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const breakerOfHorizons = {
  id: "01a0657d-ada1-7ece-af7f-194b059371d8",
  type: "page-type/story-read",
  slug: "breaker-of-horizons",
  title: "Breaker of Horizons",
  world: "world/breaker-of-horizons",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "32123",
      externalLink: "https://www.royalroad.com/fiction/32123/breaker-of-horizons",
    },
  ],
  rank: "C",
  externalTags: [
    "Urban Fantasy",
    "Psychological",
    "Male Lead",
    "Contemporary",
    "Slice of Life",
    "Drama",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "School Life",
  ],
  unit: "unit/words",
} as const satisfies StoryRead
