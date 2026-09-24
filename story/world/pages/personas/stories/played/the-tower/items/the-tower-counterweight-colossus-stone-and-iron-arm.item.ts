import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerCounterweightColossusStoneAndIronArm = {
  id: "01a0d3d0-a3f4-7553-b322-591a7a2e6e81",
  type: "page-type/item",
  slug: "the-tower-counterweight-colossus-stone-and-iron-arm",
  title: "Stone-and-iron arm",
  story: "story-played/the-tower",
  character: "character-other/the-tower-counterweight-colossus-01",
  slot: "item-slot/main-hand",
  description: "An arm of fused stone and iron that comes down like a hammer.",
} as const satisfies Item
