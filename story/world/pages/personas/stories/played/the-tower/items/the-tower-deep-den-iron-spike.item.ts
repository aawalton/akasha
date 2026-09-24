import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerDeepDenIronSpike = {
  id: "01a0d445-525b-7925-a314-c550479ef4c7",
  type: "page-type/item",
  slug: "the-tower-deep-den-iron-spike",
  title: "A spare iron spike",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "An iron spike lying in the midden.",
} as const satisfies Item
