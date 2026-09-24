import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerDrownedSentryFusedPlate = {
  id: "01a0d3d0-b0c5-7e1e-bcca-579e9bc54325",
  type: "page-type/item",
  slug: "the-tower-drowned-sentry-fused-plate",
  title: "Fused plate",
  story: "story-played/the-tower",
  character: "character-other/the-tower-drowned-sentry-01",
  slot: "item-slot/chest",
  description:
    "Old plate rusted fused at every joint, open only at a seam of rotted leather and rings behind the neck.",
} as const satisfies Item
