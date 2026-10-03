import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const otherwhereIxLaidSpineQuills = {
  id: "01a1034d-4dc0-7604-989a-9bbea2765ee4",
  type: "page-type/story-item",
  slug: "otherwhere-ix-laid-spine-quills",
  title: "Spine Quills",
  story: "story-played/otherwhere-ix",
  place: "place/otherwhere-ix-glassgrass-flats",
  quantity: 3,
  description:
    "Whole shardback spine quills, each a hand and a half long, laid out in the grass beside Nala's first kill.",
} as const satisfies StoryItem
