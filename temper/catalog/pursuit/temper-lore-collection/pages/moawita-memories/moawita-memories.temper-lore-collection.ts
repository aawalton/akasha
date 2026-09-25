import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const moawitaMemories = {
  id: "01a0d60a-f1ed-7272-96db-27c91d3f2e0d",
  type: "page-type/temper-lore-collection",
  slug: "moawita-memories",
  title: "Moawita Memories",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 36,
  esoLoreCollectionId: 136,
  loreCollectionDescription: "Descriptions of the collected relics of the Vault of Moawita.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_magic.dds",
  hidden: false,
  bookTotal: 21,
} as const satisfies TemperLoreCollection
