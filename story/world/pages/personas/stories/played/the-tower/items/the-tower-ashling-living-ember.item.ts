import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerAshlingLivingEmber = {
  id: "01a0d3dd-b74f-7c36-b921-e85947018666",
  type: "page-type/item",
  slug: "the-tower-ashling-living-ember",
  title: "Living ember",
  story: "story-played/the-tower",
  character: "character-other/the-tower-ashling-01",
  slot: "item-slot/body",
  description:
    "A knot of living ember in loose ash, driven at its target in a low fast rush of grey and heat.",
} as const satisfies Item
