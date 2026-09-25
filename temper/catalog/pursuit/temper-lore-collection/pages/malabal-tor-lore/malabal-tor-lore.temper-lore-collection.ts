import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const malabalTorLore = {
  id: "01a06343-f9fa-70e2-ac1c-ccd90510810e",
  type: "page-type/temper-lore-collection",
  slug: "malabal-tor-lore",
  title: "Malabal Tor Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 21,
  esoLoreCollectionId: 26,
  loreCollectionDescription: "A collection of Mages Guild books found in Malabal Tor.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
