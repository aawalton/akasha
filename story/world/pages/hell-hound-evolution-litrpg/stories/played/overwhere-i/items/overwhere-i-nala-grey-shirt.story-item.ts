import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereINalaGreyShirt = {
  id: "01a0f1b8-85ca-753a-b764-5f4280bfe5a9",
  type: "page-type/story-item",
  slug: "overwhere-i-nala-grey-shirt",
  title: "Grey Shirt",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  slot: "item-slot/chest",
  description: "A loose dark grey shirt that hangs to her mid-thigh and gapes at the collar.",
} as const satisfies StoryItem
