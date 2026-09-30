import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaGrayShirt = {
  id: "01a0f1b9-8734-7fdc-965b-c5ebe5f523ba",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-gray-shirt",
  title: "Gray Shirt",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  slot: "item-slot/chest",
  description: "A loose dark gray shirt that hangs to her mid-thigh and gapes at the collar.",
} as const satisfies StoryItem
