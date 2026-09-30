import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaWatchTunic = {
  id: "01a0f1bc-56c8-7c91-9ec3-414a5a716bc6",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-watch-tunic",
  title: "Watch Tunic",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  slot: "item-slot/body",
  description: "A plain grey wool tunic of the Millbrook watch, falling to her knees.",
} as const satisfies StoryItem
