import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const arkendrithyst = {
  id: "01a0657d-ada0-778f-ac4e-3e9d9b8589ed",
  type: "page-type/story-read",
  slug: "arkendrithyst",
  title: "Ar'Kendrithyst",
  world: "world/arkendrithyst",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "26727",
      externalLink: "https://www.royalroad.com/fiction/26727/arkendrithyst",
    },
  ],
  author: "Arcs",
  rank: "C",
  publicationStatus: "completed",
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Slice of Life",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
