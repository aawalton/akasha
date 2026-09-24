import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHalfBurnedJournal = {
  id: "01a0d445-628c-7260-b2f0-7c8251678ef3",
  type: "page-type/item",
  slug: "the-tower-half-burned-journal",
  title: "A half-burned journal",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "A half-burned journal lying in the midden.",
} as const satisfies Item
