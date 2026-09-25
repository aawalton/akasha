import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const militaryOrdersAndReports = {
  id: "01a0d5f3-7054-789f-9f41-50144f70f9df",
  type: "page-type/temper-lore-collection",
  slug: "military-orders-and-reports",
  title: "Military Orders and Reports",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 10,
  esoLoreCollectionId: 53,
  loreCollectionDescription:
    "Correspondence by commanders, soldiers, and sailors relating to warfare.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 106,
} as const satisfies TemperLoreCollection
