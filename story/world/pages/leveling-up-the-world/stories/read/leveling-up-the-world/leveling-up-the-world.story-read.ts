import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const levelingUpTheWorld = {
  id: "01a0657d-ada3-7307-92c3-92b7e6fbbcea",
  type: "page-type/story-read",
  slug: "leveling-up-the-world",
  title: "Leveling up the World",
  world: "world/leveling-up-the-world",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "39026",
      externalLink: "https://www.royalroad.com/fiction/39026/leveling-up-the-world",
    },
  ],
  author: "Lise Eclaire",
  following: true,
  grade: "C",
  externalTags: ["GameLit", "Portal Fantasy / Isekai", "Male Lead", "Action", "Adventure"],
  unit: "unit/words",
  prose: "txt",
  createdAt: "2026-09-03T04:18:50.403Z",
  updatedAt: "2026-09-28T20:27:20.000Z",
} as const satisfies StoryRead
