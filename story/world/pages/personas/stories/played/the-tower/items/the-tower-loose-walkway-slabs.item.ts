import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerLooseWalkwaySlabs = {
  id: "01a0d443-0157-777f-afc9-13f17508c777",
  type: "page-type/item",
  slug: "the-tower-loose-walkway-slabs",
  title: "Loose walkway slabs",
  story: "story-played/the-tower",
  place: "place/the-tower-cistern-walkway",
  description: "Cracked stone slabs along the walkway ring, loose enough to pry up.",
} as const satisfies Item
