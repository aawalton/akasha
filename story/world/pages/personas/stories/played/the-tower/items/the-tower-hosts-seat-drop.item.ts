import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHostsSeatDrop = {
  id: "01a0d445-6a41-7050-833c-8a218cbe73aa",
  type: "page-type/item",
  slug: "the-tower-hosts-seat-drop",
  title: "The drop",
  story: "story-played/the-tower",
  place: "place/the-tower-the-hosts-seat",
  description: "A sheer black drop torn across the chamber's floor.",
} as const satisfies Item
