import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theConnectedSystem = {
  id: "01a0657d-ada7-7547-8b88-d8e85de79a6d",
  type: "page-type/story-read",
  slug: "the-connected-system",
  title: "The Connected System",
  world: "world/the-connected-system",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CW19LKFJ",
      externalLink: "https://www.amazon.com/dp/B0CW19LKFJ",
    },
    {
      source: "royal-road",
      externalId: "73202",
      externalLink: "https://www.royalroad.com/fiction/73202/the-connected-system",
    },
  ],
  externalTags: [
    "LitRPG",
    "Progression",
    "Post Apocalyptic",
    "Male Lead",
    "Slice of Life",
    "Action",
    "Adventure",
    "Fantasy",
    "Dungeon Crawler",
    "GameLit",
    "Low Fantasy",
    "Strong Lead",
  ],
  readLater: true,
  grade: "C",
  tags: ["System Apocalypse"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-10-25T10:19:28.080Z",
} as const satisfies StoryRead
