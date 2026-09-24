import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerRobedCorpse = {
  id: "01a0d443-754c-72b4-9d26-b09758d37418",
  type: "page-type/item",
  slug: "the-tower-robed-corpse",
  title: "Corpse in old robes",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-alcove",
  description: "The body of a previous climber in old robes, slumped in the alcove's corner.",
} as const satisfies Item
