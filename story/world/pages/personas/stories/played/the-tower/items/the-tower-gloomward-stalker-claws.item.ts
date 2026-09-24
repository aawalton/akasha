import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerGloomwardStalkerClaws = {
  id: "01a0d3d0-c825-7675-afbc-0a58a6db1579",
  type: "page-type/item",
  slug: "the-tower-gloomward-stalker-claws",
  title: "Claws",
  story: "story-played/the-tower",
  character: "character-other/the-tower-gloomward-stalker-01",
  slot: "item-slot/main-hand",
  description: "The claws on a long lean body that lunges out of unlit gaps.",
} as const satisfies Item
