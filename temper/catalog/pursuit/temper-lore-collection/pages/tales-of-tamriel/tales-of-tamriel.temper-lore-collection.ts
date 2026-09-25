import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const talesOfTamriel = {
  id: "01a0d5f5-7768-7577-b0ee-cc682b309894",
  type: "page-type/temper-lore-collection",
  slug: "tales-of-tamriel",
  title: "Tales of Tamriel",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 17,
  esoLoreCollectionId: 60,
  loreCollectionDescription:
    "Stories and ancient legends, horrific accounts of massacres, and bedtime tales for the wee ones.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 118,
} as const satisfies TemperLoreCollection
