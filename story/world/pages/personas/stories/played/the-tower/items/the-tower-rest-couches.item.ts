import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerRestCouches = {
  id: "01a0d445-132a-7ac3-9669-d3af7b9ffa41",
  type: "page-type/item",
  slug: "the-tower-rest-couches",
  title: "The rest-couches and the made bed",
  story: "story-played/the-tower",
  place: "place/the-tower-hall-of-welcome",
  description: "Soft couches and a made bed along the warm wall.",
} as const satisfies Item
