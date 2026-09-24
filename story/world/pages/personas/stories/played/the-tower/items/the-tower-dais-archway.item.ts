import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerDaisArchway = {
  id: "01a0d443-94a9-7e6e-ad33-ff96ae9aca31",
  type: "page-type/item",
  slug: "the-tower-dais-archway",
  title: "The dais archway",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-dais",
  description: "A tall stone archway behind the dais, open onto the shaft beyond.",
} as const satisfies Item
