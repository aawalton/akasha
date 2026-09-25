import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const telvanniTomes = {
  id: "01a0d60c-eb9c-76a4-95c7-526da248a1f2",
  type: "page-type/temper-lore-collection",
  slug: "telvanni-tomes",
  title: "Telvanni Tomes",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 48,
  esoLoreCollectionId: 210,
  loreCollectionDescription:
    "Letters, journals, and other books created in or pertaining to the inhabitants of the Telvanni Peninsula.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 97,
} as const satisfies TemperLoreCollection
