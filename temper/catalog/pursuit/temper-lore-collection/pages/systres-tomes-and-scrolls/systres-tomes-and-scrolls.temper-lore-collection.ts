import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const systresTomesAndScrolls = {
  id: "01a0d60c-75b6-77f7-aff7-32fe59f90864",
  type: "page-type/temper-lore-collection",
  slug: "systres-tomes-and-scrolls",
  title: "Systres Tomes and Scrolls",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 45,
  esoLoreCollectionId: 200,
  loreCollectionDescription:
    "Books, notes, and other writings prominent on High Isles and Amenos in the Systres Archipelago.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 128,
} as const satisfies TemperLoreCollection
