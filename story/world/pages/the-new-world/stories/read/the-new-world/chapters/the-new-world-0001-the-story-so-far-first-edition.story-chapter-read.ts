import type { StoryChapterRead } from "akasha/story/chapter-read/story-chapter-read.page-type.types.ts"

export const theNewWorld0001TheStorySoFarFirstEdition = {
  id: "01a06730-4e2c-7aa7-8ab8-f26c44d858f0",
  type: "page-type/story-chapter-read",
  slug: "the-new-world-0001-the-story-so-far-first-edition",
  title: "The Story So Far: First Edition",
  story: "story-read/the-new-world",
  position: 1,
  ownLength: 2548,
  unit: "unit/words",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "155785",
      externalLink:
        "https://www.royalroad.com/fiction/12024/the-new-world/chapter/155785/the-story-so-far-first-edition",
    },
  ],
  publishedAt: "2017-08-16",
  ownProgress: 2548,
  completedAt: "2026-06-29T21:20:42.105Z",
  prose: "txt",
} as const satisfies StoryChapterRead
