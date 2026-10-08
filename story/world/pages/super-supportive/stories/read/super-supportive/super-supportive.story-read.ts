import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const superSupportive = {
  id: "01a0657d-ada5-7cc6-80ff-4b827d0d4403",
  type: "page-type/story-read",
  slug: "super-supportive",
  title: "Super Supportive",
  world: "world/super-supportive",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "63759",
      externalLink: "https://www.royalroad.com/fiction/63759/super-supportive",
    },
  ],
  author: "Sleyca",
  following: true,
  publicationStatus: "ongoing",
  externalTags: [
    "Progression",
    "Super Heroes",
    "Sci-fi",
    "Slice of Life",
    "Drama",
    "Fantasy",
    "First Contact",
    "Low Fantasy",
    "Magic",
    "School Life",
    "Soft Sci-fi",
  ],
  unit: "unit/words",
  prose: "txt",
  createdAt: "2026-09-03T04:18:50.405Z",
  updatedAt: "2026-09-19T12:04:19.000Z",
} as const satisfies StoryRead
