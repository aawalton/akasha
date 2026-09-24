import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHollowCantorSong = {
  id: "01a0d3dd-c311-7e9e-b0cc-dd94ad85a5eb",
  type: "page-type/item",
  slug: "the-tower-hollow-cantor-song",
  title: "Song",
  story: "story-played/the-tower",
  character: "character-other/the-tower-hollow-cantor-01",
  slot: "item-slot/voice",
  description:
    "A song of folded sound poured through the bronze plates, clawing at the mind rather than the body.",
} as const satisfies Item
