import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIWeirWyrmFangs = {
  id: "01a101c5-e257-7856-8bd7-92da6f6106fc",
  type: "page-type/story-item",
  slug: "overwhere-i-weir-wyrm-fangs",
  title: "Weir Wyrm's Fangs",
  story: "story-played/overwhere-i",
  place: "place/overwhere-i-wendlow",
  description:
    "The Weir Wyrm's two hooked, yellow-white fangs, each a hand long, hung on a nail at Antler Hall.",
} as const satisfies StoryItem
