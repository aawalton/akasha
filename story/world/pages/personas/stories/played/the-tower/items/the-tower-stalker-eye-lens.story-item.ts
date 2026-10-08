import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerStalkerEyeLens = {
  id: "01a0ca52-bdcf-7ab2-8289-6aaa04a0097e",
  type: "page-type/story-item",
  slug: "the-tower-stalker-eye-lens",
  title: "Stalker eye-lens",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  essence: "tower-element/the-tower-dark",
  description:
    "A clouded crystalline lens, cold to the touch, that drinks light rather than throwing it back.",
  createdAt: "2026-09-22T18:13:35.311Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
