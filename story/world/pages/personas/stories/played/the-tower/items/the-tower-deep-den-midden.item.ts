import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerDeepDenMidden = {
  id: "01a0d445-42ee-7cc7-af6d-7f7e2d92185e",
  type: "page-type/item",
  slug: "the-tower-deep-den-midden",
  title: "The midden of prior climbers",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "A midden of dead climbers' packs, boots and bones.",
} as const satisfies Item
