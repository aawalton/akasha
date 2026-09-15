import type { StoryChapterRead } from "akasha/story/chapter-read/story-chapter-read.page-type.types.ts"

export const cinnamonBun0001MapsAndArt = {
  id: "01a0672c-eb01-7000-a804-d16a91b33f7c",
  type: "page-type/story-chapter-read",
  slug: "cinnamon-bun-0001-maps-and-art",
  title: "Maps and Art",
  story: "story-read/cinnamon-bun",
  position: 1,
  ownLength: 88,
  unit: "unit/words",
  publishedAt: "2020-07-28",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "530830",
      externalLink:
        "https://www.royalroad.com/fiction/31429/cinnamon-bun/chapter/530830/maps-and-art",
    },
  ],
  prose: "txt",
} as const satisfies StoryChapterRead
