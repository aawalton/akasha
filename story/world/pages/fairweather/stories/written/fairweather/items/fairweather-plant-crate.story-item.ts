import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherPlantCrate = {
  id: "01a102af-305c-79cd-a0dc-1d2b62c75cd6",
  type: "page-type/story-item",
  slug: "fairweather-plant-crate",
  title: "Plant Crate",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A slatted wooden crate with rope handles, made to carry four potted houseplants on a cart: a fern, a lemon sapling, an aloe and a pot of mint.",
} as const satisfies StoryItem
