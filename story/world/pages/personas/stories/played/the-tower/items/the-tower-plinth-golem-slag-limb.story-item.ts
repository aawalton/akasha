import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerPlinthGolemSlagLimb = {
  id: "01a0d3d0-8aa5-7ffa-9e54-ddc1c8ef2572",
  type: "page-type/story-item",
  slug: "the-tower-plinth-golem-slag-limb",
  title: "Slag limb",
  story: "story-played/the-tower",
  character: "character-other/the-tower-plinth-golem-01",
  slot: "item-slot/main-hand",
  description: "A limb of fused stone and slag, heavy as a fallen column.",
  category: "weapon",
  createdAt: "2026-09-24T14:27:34.693Z",
  updatedAt: "2026-10-27T18:59:43.093Z",
} as const satisfies StoryItem
