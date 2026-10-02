import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepTinLamp = {
  id: "01a0fde6-9f8a-7dfc-8446-f37edaa2eb31",
  type: "page-type/story-item",
  slug: "emberdeep-tin-lamp",
  title: "Tin Lamp",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description:
    "A tin lamp with a little hinged door, shutters that open wide or close to a slit, and a ring to carry it by.",
} as const satisfies StoryItem
