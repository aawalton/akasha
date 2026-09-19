import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const melodyOfMana = {
  id: "01a0657d-ada3-74cc-b919-76cef049aaa9",
  type: "page-type/story-read",
  slug: "melody-of-mana",
  title: "Melody of Mana",
  world: "world/melody-of-mana",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "43974",
      externalLink: "https://www.royalroad.com/fiction/43974/melody-of-mana",
    },
  ],
  author: "Wandering Agent",
  rank: "C",
  publicationStatus: "completed",
  externalTags: [
    "Portal Fantasy / Isekai",
    "Female Lead",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "Reincarnation",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
