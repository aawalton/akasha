import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildWellWornTrousers = {
  id: "01a10332-e99a-7ed8-a4a1-01289c7359fb",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-well-worn-trousers",
  title: "Well-Worn Trousers",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description: "Thin trousers of the same pale blue and the same age as the old shirt.",
} as const satisfies StoryItem
