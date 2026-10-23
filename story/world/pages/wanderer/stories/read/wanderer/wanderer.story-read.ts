import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const wanderer = {
  id: "01a166aa-37e8-71d8-aa54-64a5df65a34d",
  type: "page-type/story-read",
  slug: "wanderer",
  author: "IrisHart",
  following: false,
  unit: "unit/words",
  title: "Wanderer",
  world: "world/wanderer",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "112091",
      externalLink: "https://www.royalroad.com/fiction/112091/wanderer",
    },
  ],
  externalTags: [
    "Portal Fantasy / Isekai",
    "Female Lead",
    "Fantasy",
    "Reincarnation",
    "Romance Subplot",
  ],
  publicationStatus: "ongoing",
  readLater: true,
  createdAt: "2026-10-23T02:49:53.895Z",
  updatedAt: "2026-10-23T02:49:53.895Z",
} as const satisfies StoryRead
