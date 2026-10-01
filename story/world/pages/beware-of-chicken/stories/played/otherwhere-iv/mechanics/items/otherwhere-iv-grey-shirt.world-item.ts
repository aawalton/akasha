import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereIvGreyShirt = {
  id: "01a0e9f4-c086-7704-826f-e3f4cd2f1030",
  type: "page-type/world-item",
  slug: "otherwhere-iv-grey-shirt",
  title: "Grey Shirt",
  world: "world/beware-of-chicken",
  description: "A loose dark grey shirt of soft, fine-knit cloth.",
} as const satisfies WorldItem
