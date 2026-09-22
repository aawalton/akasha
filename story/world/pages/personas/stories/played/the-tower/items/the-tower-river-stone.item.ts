import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerRiverStone = {
  id: "01a0ca52-9fd4-753d-ac44-5e3800413373",
  type: "page-type/item",
  slug: "the-tower-river-stone",
  title: "River-stone (cold-imbued)",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description: "A smooth dark river-stone holding a crude bind of cold essence.",
} as const satisfies Item
