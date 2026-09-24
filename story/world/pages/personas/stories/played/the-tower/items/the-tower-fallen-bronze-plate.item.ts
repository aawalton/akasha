import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerFallenBronzePlate = {
  id: "01a0d443-5cda-7869-a9ce-6fec0f4146ff",
  type: "page-type/item",
  slug: "the-tower-fallen-bronze-plate",
  title: "Fallen bronze plate",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-nave",
  description:
    "A bronze resonance-plate lying fallen mid-nave, a sheet of bronze some two metres long.",
} as const satisfies Item
