import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const foxification = {
  id: "01a168ce-1fab-7baa-bd04-5edd2ed531dd",
  type: "page-type/story-read",
  slug: "foxification",
  author: "Catnip",
  following: false,
  unit: "unit/words",
  title: "Foxification",
  world: "world/foxification",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "80157",
      externalLink: "https://www.royalroad.com/fiction/80157/foxification",
    },
  ],
  externalTags: [
    "LitRPG",
    "Non-Human Lead",
    "Slice of Life",
    "Adventure",
    "Fantasy",
    "Dungeon Core",
    "Female Lead",
    "High Fantasy",
    "Magic",
  ],
  readLater: true,
  createdAt: "2026-10-23T12:48:21.419Z",
  updatedAt: "2026-10-23T12:48:21.419Z",
} as const satisfies StoryRead
