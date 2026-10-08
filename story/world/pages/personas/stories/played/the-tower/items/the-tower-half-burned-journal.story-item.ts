import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerHalfBurnedJournal = {
  id: "01a0d445-628c-7260-b2f0-7c8251678ef3",
  type: "page-type/story-item",
  slug: "the-tower-half-burned-journal",
  title: "A half-burned journal",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "A half-burned journal lying in the midden.",
  createdAt: "2026-09-24T16:35:12.140Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
