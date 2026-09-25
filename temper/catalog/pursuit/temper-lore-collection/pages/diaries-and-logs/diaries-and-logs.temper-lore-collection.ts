import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const diariesAndLogs = {
  id: "01a0d5f2-509f-766c-ac29-e52e0959d0ab",
  type: "page-type/temper-lore-collection",
  slug: "diaries-and-logs",
  title: "Diaries and Logs",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 4,
  esoLoreCollectionId: 47,
  loreCollectionDescription:
    "Tamrielic peoples feel they have a duty to record the events of their lives.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 84,
} as const satisfies TemperLoreCollection
