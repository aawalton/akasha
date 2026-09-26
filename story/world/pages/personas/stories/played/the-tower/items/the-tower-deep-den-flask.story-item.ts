import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerDeepDenFlask = {
  id: "01a0d445-4ab7-7bdd-bfdb-1403066c0bb4",
  type: "page-type/story-item",
  slug: "the-tower-deep-den-flask",
  title: "A scavenged flask",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "A stoppered flask lying in the midden.",
} as const satisfies StoryItem
