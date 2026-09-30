import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereILeatherPack = {
  id: "01a0f1c0-467e-7006-bbed-214b55f26ccb",
  type: "page-type/story-item",
  slug: "overwhere-i-leather-pack",
  title: "Leather Pack",
  story: "story-played/overwhere-i",
  place: "place/overwhere-i-fenwatch",
  description: "A plain pack of stiff brown leather on two shoulder straps, with a buckled flap.",
} as const satisfies StoryItem
