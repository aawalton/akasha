import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const discontinued = {
  id: "01a16903-9d98-702b-b970-7b12cc3d034a",
  type: "page-type/story-read",
  slug: "discontinued",
  author: "Lord Streak",
  following: false,
  unit: "unit/words",
  title: "Discontinued",
  world: "world/discontinued",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "105363",
      externalLink: "https://www.royalroad.com/fiction/105363/discontinued",
    },
  ],
  externalTags: [
    "Urban Fantasy",
    "Progression",
    "Strategy",
    "Contemporary",
    "Action",
    "Fantasy",
    "Magic",
  ],
  readLater: true,
  createdAt: "2026-10-23T13:46:47.064Z",
  updatedAt: "2026-10-23T13:46:47.064Z",
} as const satisfies StoryRead
