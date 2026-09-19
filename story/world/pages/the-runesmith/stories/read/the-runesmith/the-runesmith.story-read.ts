import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theRunesmith = {
  id: "01a0657d-ada5-79d1-82c0-b37cf484c769",
  type: "page-type/story-read",
  slug: "the-runesmith",
  rank: "C",
  unit: "unit/words",
  title: "The Runesmith",
  world: "world/the-runesmith",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "31474",
      externalLink: "https://www.royalroad.com/fiction/31474/the-runesmith",
    },
  ],
  externalTags: [
    "GameLit",
    "Reincarnation",
    "Female Lead",
    "Slice of Life",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Gender Bender",
    "High Fantasy",
    "Magic",
  ],
  publicationStatus: "hiatus",
} as const satisfies StoryRead
