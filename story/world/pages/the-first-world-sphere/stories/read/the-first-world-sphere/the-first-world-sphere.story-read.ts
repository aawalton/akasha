import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theFirstWorldSphere = {
  id: "01a16d1c-72ab-747d-82ad-2eba55a038f1",
  type: "page-type/story-read",
  slug: "the-first-world-sphere",
  author: "Alwaysrollsaone",
  following: false,
  unit: "unit/words",
  title: "The First World Sphere",
  world: "world/the-first-world-sphere",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "54030",
      externalLink: "https://www.royalroad.com/fiction/54030/the-first-world-sphere",
    },
  ],
  externalTags: [
    "GameLit",
    "Reincarnation",
    "Progression",
    "Kingdom Building",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Dungeon Crawler",
    "High Fantasy",
    "Magic",
    "School Life",
    "Slice of Life",
  ],
  readLater: true,
  createdAt: "2026-10-24T08:52:23.339Z",
  updatedAt: "2026-10-24T08:52:23.339Z",
} as const satisfies StoryRead
