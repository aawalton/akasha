import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const blueBoxesNalaSleepShirt = {
  id: "01a14af3-b1f6-7d28-999e-4bdbbcde9826",
  type: "page-type/story-item",
  slug: "blue-boxes-nala-sleep-shirt",
  title: "Sleep Shirt",
  story: "story-played/blue-boxes",
  character: "character-player/blue-boxes-nala",
  slot: "item-slot/body",
  description: "A thin cotton sleep shirt from Earth, cut for a man's frame and hanging loose.",
  createdAt: "2026-10-17T17:40:47.221Z",
  updatedAt: "2026-10-17T17:40:47.221Z",
} as const satisfies StoryItem
