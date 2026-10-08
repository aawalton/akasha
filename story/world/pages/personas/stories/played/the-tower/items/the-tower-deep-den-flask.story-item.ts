import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerDeepDenFlask = {
  id: "01a0d445-4ab7-7bdd-bfdb-1403066c0bb4",
  type: "page-type/story-item",
  slug: "the-tower-deep-den-flask",
  title: "A scavenged flask",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "A stoppered flask lying in the midden.",
  createdAt: "2026-09-24T16:35:06.039Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
