import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerPlinthGolemSlagHide = {
  id: "01a0d3d0-41d2-72b6-8768-4fa3ff160265",
  type: "page-type/story-item",
  slug: "the-tower-plinth-golem-slag-hide",
  title: "Slag hide",
  story: "story-played/the-tower",
  character: "character-other/the-tower-plinth-golem-01",
  slot: "item-slot/chest",
  description: "Fused rock and cooled slag, thick, with deep cracks that smoulder from inside.",
} as const satisfies StoryItem
