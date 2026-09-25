import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const elusiveManuscripts = {
  id: "01a0d60d-d472-78e3-b1bb-9a1474226545",
  type: "page-type/temper-lore-collection",
  slug: "elusive-manuscripts",
  title: "Elusive Manuscripts",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 54,
  esoLoreCollectionId: 232,
  loreCollectionDescription:
    "Only the most dedicated book collectors and hunters of rare tomes ever get their hands on these elusive manuscripts from all over Tamriel, across Nirn, and even beyond.",
  gamepadIcon: "/esoui/art/icons/icon_missing.dds",
  hidden: false,
  bookTotal: 8,
} as const satisfies TemperLoreCollection
