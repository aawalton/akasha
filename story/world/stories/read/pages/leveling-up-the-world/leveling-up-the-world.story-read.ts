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
  rank: "C",
  externalTags: ["GameLit", "Portal Fantasy / Isekai", "Male Lead", "Action", "Adventure"],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
