import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerLedgeMessage = {
  id: "01a0d444-6b00-7911-9ca9-56768b1462c0",
  type: "page-type/item",
  slug: "the-tower-ledge-message",
  title: "The ledge message",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-mid-slabs",
  description: "A message scratched into the wall beside the dead climber, left unfinished.",
} as const satisfies Item
