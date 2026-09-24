import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHavenHearth = {
  id: "01a0d445-03fe-7ba0-a1ef-b081ca0b6c8c",
  type: "page-type/item",
  slug: "the-tower-haven-hearth",
  title: "The banked hearth",
  story: "story-played/the-tower",
  place: "place/the-tower-haven-threshold",
  description:
    "A dead hearth of grey ash under a false glow that gives no heat and casts no shadow.",
} as const satisfies Item
