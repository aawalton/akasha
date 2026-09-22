import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerStalkerEyeLens = {
  id: "01a0ca52-bdcf-7ab2-8289-6aaa04a0097e",
  type: "page-type/item",
  slug: "the-tower-stalker-eye-lens",
  title: "Stalker eye-lens",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description:
    "A clouded crystalline lens, cold to the touch, that drinks light rather than throwing it back.",
} as const satisfies Item
