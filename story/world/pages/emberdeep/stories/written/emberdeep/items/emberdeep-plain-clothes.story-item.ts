import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepPlainClothes = {
  id: "01a0fde6-9f89-7718-8b98-f691047d6185",
  type: "page-type/story-item",
  slug: "emberdeep-plain-clothes",
  title: "Plain Clothes",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description:
    "A plain shirt, a bodice laced up the front, a pair of breeches and boots, with a thin linen nightshirt. A strip torn from the hem of the shirt to bind Wren's arm has been mended neatly by Elowen; the hem of the nightshirt is still torn where a strip went to bind the same arm.",
} as const satisfies StoryItem
