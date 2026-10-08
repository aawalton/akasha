import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const alikrDesertLore = {
  id: "01a06343-f9fa-702b-8f74-57d18cde0d2a",
  type: "page-type/temper-lore-collection",
  slug: "alikr-desert-lore",
  title: "Alik'r Desert Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 5,
  esoLoreCollectionId: 8,
  loreCollectionDescription: "A Mages Guild collection of lore books about the Alik'r Desert.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 10,
  createdAt: "2026-09-02T17:56:34.426Z",
  updatedAt: "2026-09-25T01:28:09.000Z",
} as const satisfies TemperLoreCollection
