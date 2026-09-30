import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaBasket = {
  id: "01a0f21c-c14c-7ac1-99c9-b855d731f628",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-basket",
  title: "Basket",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A woven basket with a handle, holding six eggs and a crock of honey.",
} as const satisfies StoryItem
