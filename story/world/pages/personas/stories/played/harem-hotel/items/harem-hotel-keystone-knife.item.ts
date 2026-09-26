import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const haremHotelKeystoneKnife = {
  id: "01a0de4b-697f-778b-819d-caf5ba63a618",
  type: "page-type/item",
  slug: "harem-hotel-keystone-knife",
  title: "Keystone Knife",
  story: "story-played/harem-hotel",
  character: "character-player/harem-hotel-alan",
  slot: "item-slot/main-hand",
  description: "A slim, plain, cold knife no longer than a hand.",
} as const satisfies Item
