import type { StoryChapterRead } from "akasha/story/chapter-read/story-chapter-read.page-type.types.ts"

export const theGiftOfLoot0001Chapter1FirstDungeon = {
  id: "01a06730-4ed9-7222-b783-f8e14e3da1a8",
  type: "page-type/story-chapter-read",
  slug: "the-gift-of-loot-0001-chapter-1-first-dungeon",
  title: "Chapter 1: First Dungeon",
  story: "story-read/the-gift-of-loot",
  position: 1,
  ownLength: 2149,
  unit: "unit/words",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "3219287",
      externalLink:
        "https://www.royalroad.com/fiction/160377/the-gift-of-loot/chapter/3219287/chapter-1-first-dungeon",
    },
  ],
  publishedAt: "2026-04-01",
  prose: "txt",
} as const satisfies StoryChapterRead
