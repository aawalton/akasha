import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerRiverStone = {
  id: "01a0ca52-9fd4-753d-ac44-5e3800413373",
  type: "page-type/story-item",
  slug: "the-tower-river-stone",
  title: "River-stone (cold-imbued)",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description: "A smooth dark river-stone holding a crude bind of cold essence.",
  createdAt: "2026-09-22T18:13:27.636Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
