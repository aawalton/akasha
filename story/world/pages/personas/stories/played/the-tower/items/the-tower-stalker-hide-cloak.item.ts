import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerStalkerHideCloak = {
  id: "01a0ca52-9043-70f6-8c3e-4b908fde0651",
  type: "page-type/item",
  slug: "the-tower-stalker-hide-cloak",
  title: "Stalker hide cloak",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  slot: "item-slot/chest",
  description: "A pale stalker hide tied loosely round the neck, uncrafted and loose.",
} as const satisfies Item
