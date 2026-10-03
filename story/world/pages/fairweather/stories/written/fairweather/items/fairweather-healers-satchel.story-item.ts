import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherHealersSatchel = {
  id: "01a102af-305c-7762-ad10-b82efef89355",
  type: "page-type/story-item",
  slug: "fairweather-healers-satchel",
  title: "Healer's Satchel",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A little leather satchel worn soft, holding rolled bandages, a splint, needle and thread, willow bark, honey salve and dried simples in twists of paper.",
} as const satisfies StoryItem
