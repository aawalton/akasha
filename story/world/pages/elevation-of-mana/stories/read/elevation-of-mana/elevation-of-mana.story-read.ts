import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const elevationOfMana = {
  id: "01a168ce-b050-76fd-acba-5275aabe51d1",
  type: "page-type/story-read",
  slug: "elevation-of-mana",
  author: "Wandering Agent",
  following: false,
  unit: "unit/words",
  title: "Elevation of Mana",
  world: "world/elevation-of-mana",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "66904",
      externalLink: "https://www.royalroad.com/fiction/66904/elevation-of-mana",
    },
  ],
  externalTags: ["Reincarnation", "Non-Human Lead", "Fantasy", "Male Lead"],
  readLater: true,
  createdAt: "2026-10-23T12:48:58.448Z",
  updatedAt: "2026-10-23T12:48:58.448Z",
} as const satisfies StoryRead
