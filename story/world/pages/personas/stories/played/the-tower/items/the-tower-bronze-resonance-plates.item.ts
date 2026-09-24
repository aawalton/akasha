import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerBronzeResonancePlates = {
  id: "01a0d443-4ccd-77af-8984-36eb219126d2",
  type: "page-type/item",
  slug: "the-tower-bronze-resonance-plates",
  title: "Bronze resonance-plates",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-nave",
  description:
    "Tall bronze plates green with age, set at intervals down both walls, each taller than a man.",
} as const satisfies Item
