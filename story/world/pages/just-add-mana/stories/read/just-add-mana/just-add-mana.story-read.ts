import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const justAddMana = {
  id: "01a0657d-ada3-7ae9-aaf6-42aa2d3f44aa",
  type: "page-type/story-read",
  slug: "just-add-mana",
  title: "Just Add Mana",
  world: "world/just-add-mana",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "125163",
      externalLink: "https://www.royalroad.com/fiction/125163/just-add-mana",
    },
  ],
  author: "SilverLinings",
  rank: "B",
  following: true,
  publicationStatus: "ongoing",
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Comedy",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "Reincarnation",
    "School Life",
    "Slice of Life",
    "Strong Lead",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
