import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerDrownedSentryPlatedArm = {
  id: "01a0d3d0-bcb4-77d5-a423-aaab215654ec",
  type: "page-type/item",
  slug: "the-tower-drowned-sentry-plated-arm",
  title: "Plated arm",
  story: "story-played/the-tower",
  character: "character-other/the-tower-drowned-sentry-01",
  slot: "item-slot/main-hand",
  description: "A plated arm that beats down slow and heavy as a hammer.",
} as const satisfies Item
