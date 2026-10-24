import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const talesOfDestiny = {
  id: "01a16d86-5619-7ed9-8f05-295a837396f3",
  type: "page-type/story-read",
  slug: "tales-of-destiny",
  author: "Yrsillar",
  following: false,
  unit: "unit/words",
  title: "Tales of Destiny",
  world: "world/tales-of-destiny",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "26470",
      externalLink: "https://www.royalroad.com/fiction/26470/tales-of-destiny",
    },
  ],
  externalTags: ["Wuxia", "Short Story", "Cultivation", "Magic"],
  publicationStatus: "ongoing",
  readLater: true,
  createdAt: "2026-10-24T10:48:02.841Z",
  updatedAt: "2026-10-24T10:48:02.841Z",
} as const satisfies StoryRead
