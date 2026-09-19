import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const dungeonDevotee = {
  id: "01a0657d-ada2-77ae-9bca-4062ead98716",
  type: "page-type/story-read",
  slug: "dungeon-devotee",
  title: "Dungeon Devotee",
  world: "world/dungeon-devotee",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "51358",
      externalLink: "https://www.royalroad.com/fiction/51358/dungeon-devotee",
    },
  ],
  author: "Nixia",
  rank: "C",
  following: true,
  externalTags: [
    "LitRPG",
    "Progression",
    "Psychological",
    "Male Lead",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Dungeon Crawler",
    "GameLit",
    "High Fantasy",
    "Magic",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
