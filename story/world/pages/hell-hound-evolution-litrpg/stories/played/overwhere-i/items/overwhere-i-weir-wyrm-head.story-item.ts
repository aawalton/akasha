import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIWeirWyrmHead = {
  id: "01a101b8-b4ff-7fe1-aded-067f02d8d432",
  type: "page-type/story-item",
  slug: "overwhere-i-weir-wyrm-head",
  title: "Weir Wyrm's Head",
  story: "story-played/overwhere-i",
  place: "place/overwhere-i-hobbs-mill-weir",
  description:
    "The Weir Wyrm's scorched, grey-green head, about 80 pounds, its two fangs taken from the jaw.",
} as const satisfies StoryItem
