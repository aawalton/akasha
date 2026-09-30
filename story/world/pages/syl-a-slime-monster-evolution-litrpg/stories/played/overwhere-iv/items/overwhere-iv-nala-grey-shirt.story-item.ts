import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaGreyShirt = {
  id: "01a0f1bc-56c7-7b74-a826-606b9085f180",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-grey-shirt",
  title: "Grey Shirt",
  story: "story-played/overwhere-iv",
  place: "place/overwhere-iv-millbrook-gatehouse",
  description: "A loose old grey shirt, far too big for her, left behind her curtain.",
} as const satisfies StoryItem
