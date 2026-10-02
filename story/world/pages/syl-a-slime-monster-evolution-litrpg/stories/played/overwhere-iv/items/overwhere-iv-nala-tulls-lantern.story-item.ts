import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaTullsLantern = {
  id: "01a0fe7c-aeea-7dbf-9d3a-87602a00a1b4",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-tulls-lantern",
  title: "Tull's Lantern",
  story: "story-played/overwhere-iv",
  place: "place/overwhere-iv-tull-farm",
  description: "A farm lantern of tin and horn panes, back with Tull after the night watch.",
} as const satisfies StoryItem
