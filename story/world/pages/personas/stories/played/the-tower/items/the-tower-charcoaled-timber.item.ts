import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerCharcoaledTimber = {
  id: "01a0d442-a3b5-7c0a-ab9a-58310ab787e2",
  type: "page-type/item",
  slug: "the-tower-charcoaled-timber",
  title: "Charcoaled timber",
  story: "story-played/the-tower",
  place: "place/the-tower-threshold-landing",
  description: "Charcoaled timber and a fallen beam that crumble to charcoal at a touch.",
} as const satisfies Item
