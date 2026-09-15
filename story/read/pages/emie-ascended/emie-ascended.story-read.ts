import type { StoryRead } from "akasha/story/read/story-read.page-type.types.ts"

export const emieAscended = {
  id: "01a0657d-ada2-7bc7-8dba-9b0da81ef377",
  type: "story-read",
  slug: "emie-ascended",
  title: "Emie Ascended",
  world: "world/emie-ascended",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "170179",
      externalLink: "https://www.royalroad.com/fiction/170179/emie-ascended",
    },
  ],
  author: "Braided Sky",
  following: true,
  publicationStatus: "ongoing",
  externalTags: [
    "GameLit",
    "Progression",
    "Female Lead",
    "Slice of Life",
    "Strong Lead",
    "Adventure",
    "Fantasy",
    "Attractive Lead",
    "Crafting",
    "Dungeon Crawler",
    "High Fantasy",
    "Magic",
    "Romance Subplot",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
