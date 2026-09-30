import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaGreyShirt = {
  id: "01a0f1b7-8443-7a47-8f6e-ef0a07c4b3b6",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-grey-shirt",
  title: "Grey Shirt",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  slot: "item-slot/chest",
  description: "A loose dark grey shirt of soft, finely knit cloth, far too big for her.",
} as const satisfies StoryItem
