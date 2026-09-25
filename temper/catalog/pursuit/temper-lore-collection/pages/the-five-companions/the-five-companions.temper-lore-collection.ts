import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theFiveCompanions = {
  id: "01a0d5f5-c96e-7dce-a5c1-397cf913e88f",
  type: "page-type/temper-lore-collection",
  slug: "the-five-companions",
  title: "The Five Companions",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 19,
  esoLoreCollectionId: 62,
  loreCollectionDescription:
    "Books relating to a hero's quest to recover a lost soul from Molag Bal.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 19,
} as const satisfies TemperLoreCollection
