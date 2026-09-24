import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHollowCantorTuningShard = {
  id: "01a0d44f-01bf-7722-8097-a54f714343a7",
  type: "page-type/item",
  slug: "the-tower-hollow-cantor-tuning-shard",
  title: "Tuning-shard",
  story: "story-played/the-tower",
  character: "character-other/the-tower-hollow-cantor-01",
  essence: "tower-element/the-tower-sound",
  description: "A shard of folded sound that hums faintly when held.",
} as const satisfies Item
