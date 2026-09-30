import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaLeatherGloves = {
  id: "01a0f35f-265f-7303-8a9d-e17a659656d3",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-leather-gloves",
  title: "Leather Gloves",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  slot: "item-slot/hands",
  description:
    "Old leather work gloves, worn soft and a little big, lent from the hall's lost box.",
} as const satisfies StoryItem
