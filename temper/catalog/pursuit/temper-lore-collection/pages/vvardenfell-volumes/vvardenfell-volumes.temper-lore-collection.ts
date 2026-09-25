import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const vvardenfellVolumes = {
  id: "01a0d5f7-aa9a-76e4-934c-997a94524e25",
  type: "page-type/temper-lore-collection",
  slug: "vvardenfell-volumes",
  title: "Vvardenfell Volumes",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 30,
  esoLoreCollectionId: 102,
  loreCollectionDescription:
    "Tomes, journals, and letters relating to or found in the great volcanic island at the heart of Morrowind.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 126,
} as const satisfies TemperLoreCollection
