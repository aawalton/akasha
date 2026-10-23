import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const weavers = {
  id: "01a167f4-128b-7b35-89e3-ea61bfa828fe",
  type: "page-type/story-read",
  slug: "weavers",
  author: "Solair",
  following: false,
  unit: "unit/words",
  title: "Weavers",
  world: "world/weavers",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "105667",
      externalLink: "https://www.royalroad.com/fiction/105667/weavers",
    },
  ],
  externalTags: [
    "Progression",
    "Strategy",
    "Female Lead",
    "Strong Lead",
    "Tragedy",
    "Action",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "School Life",
  ],
  publicationStatus: "completed",
  readLater: true,
  createdAt: "2026-10-23T08:50:11.210Z",
  updatedAt: "2026-10-23T08:50:11.210Z",
} as const satisfies StoryRead
