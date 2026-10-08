import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerHoodedLantern = {
  id: "01a0ca52-cc4f-7f8c-a264-26835e86b314",
  type: "page-type/story-item",
  slug: "the-tower-hooded-lantern",
  title: "Hooded lantern (lit)",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description: "A hooded iron lantern, burning steady, throwing a directional beam.",
  createdAt: "2026-09-22T18:13:39.023Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
