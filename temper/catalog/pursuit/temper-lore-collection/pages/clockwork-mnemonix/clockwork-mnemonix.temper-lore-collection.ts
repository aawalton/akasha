import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const clockworkMnemonix = {
  id: "01a0d60a-a214-75d3-ae2e-9cacfff6f7ca",
  type: "page-type/temper-lore-collection",
  slug: "clockwork-mnemonix",
  title: "Clockwork Mnemonix",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 34,
  esoLoreCollectionId: 120,
  loreCollectionDescription:
    "An archive of tomes and records relating to Sotha Sil and his city of the same name.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_dwemer.dds",
  hidden: false,
  bookTotal: 82,
} as const satisfies TemperLoreCollection
