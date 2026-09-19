import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const dungeonCrawlerCarl = {
  id: "01a0657d-ada7-7c3a-b596-4f0d530a851c",
  type: "page-type/story-read",
  slug: "dungeon-crawler-carl",
  title: "Dungeon Crawler Carl",
  world: "world/dungeon-crawler-carl",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BX5D4LC",
      externalLink: "https://www.amazon.com/dp/B08BX5D4LC",
    },
  ],
  rank: "C",
  tags: ["System Apocalypse"],
  unit: "unit/words",
} as const satisfies StoryRead
