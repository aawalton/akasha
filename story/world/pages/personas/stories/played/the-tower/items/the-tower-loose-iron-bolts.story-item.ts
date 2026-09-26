import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerLooseIronBolts = {
  id: "01a0d444-3275-79eb-8968-567dd03d5663",
  type: "page-type/story-item",
  slug: "the-tower-loose-iron-bolts",
  title: "Loose iron bolts",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description: "Fist-sized iron bolts lying loose along the lowest flight.",
} as const satisfies StoryItem
