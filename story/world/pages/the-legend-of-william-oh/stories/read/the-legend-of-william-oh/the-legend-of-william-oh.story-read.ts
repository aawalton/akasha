import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theLegendOfWilliamOh = {
  id: "01a166aa-cee2-74c7-ad7a-973b4fd35fb9",
  type: "page-type/story-read",
  slug: "the-legend-of-william-oh",
  author: "Macronomicon",
  following: false,
  unit: "unit/words",
  title: "The Legend of William Oh",
  world: "world/the-legend-of-william-oh",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "92144",
      externalLink: "https://www.royalroad.com/fiction/92144/the-legend-of-william-oh",
    },
  ],
  externalTags: ["LitRPG", "Comedy", "Adventure", "Dungeon Crawler"],
  readLater: true,
  createdAt: "2026-10-23T02:50:32.546Z",
  updatedAt: "2026-10-23T02:50:32.546Z",
} as const satisfies StoryRead
