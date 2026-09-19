import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const bewareOfChicken = {
  id: "01a0657d-ada1-7d41-8abe-7a5a057563a6",
  type: "page-type/story-read",
  slug: "beware-of-chicken",
  title: "Beware Of Chicken",
  world: "world/beware-of-chicken",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "39408",
      externalLink: "https://www.royalroad.com/fiction/39408/beware-of-chicken",
    },
  ],
  author: "Casualfarmer",
  rank: "A",
  following: true,
  externalTags: [
    "Portal Fantasy / Isekai",
    "Cultivation",
    "Comedy",
    "Male Lead",
    "Adventure",
    "Fantasy",
    "Martial Arts",
    "Reincarnation",
    "Romance Subplot",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
