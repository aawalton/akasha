import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const jurassicBawk = {
  id: "01a166aa-37e7-7f29-9689-88b181bcbfdd",
  type: "page-type/story-read",
  slug: "jurassic-bawk",
  author: "Diplomancer",
  following: false,
  unit: "unit/words",
  title: "Jurassic Bawk",
  world: "world/jurassic-bawk",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "106787",
      externalLink: "https://www.royalroad.com/fiction/106787/jurassic-bawk",
    },
  ],
  externalTags: [
    "LitRPG",
    "Progression",
    "Non-Human Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Male Lead",
    "Supernatural",
  ],
  publicationStatus: "ongoing",
  readLater: true,
  createdAt: "2026-10-23T02:49:53.895Z",
  updatedAt: "2026-10-23T02:49:53.895Z",
} as const satisfies StoryRead
