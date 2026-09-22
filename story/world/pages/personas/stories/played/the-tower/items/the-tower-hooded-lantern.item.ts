import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHoodedLantern = {
  id: "01a0ca52-cc4f-7f8c-a264-26835e86b314",
  type: "page-type/item",
  slug: "the-tower-hooded-lantern",
  title: "Hooded lantern (lit)",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
} as const satisfies Item
