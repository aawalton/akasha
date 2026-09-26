import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerLedgeCorpse = {
  id: "01a0d444-6355-72a8-b665-11a66506db94",
  type: "page-type/story-item",
  slug: "the-tower-ledge-corpse",
  title: "Dead climber on the ledge",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-mid-slabs",
  description: "A climber long dead, dried and still, his back to the stone of a narrow ledge.",
} as const satisfies StoryItem
