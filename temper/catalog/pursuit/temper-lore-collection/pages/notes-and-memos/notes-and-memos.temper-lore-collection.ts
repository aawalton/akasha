import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const notesAndMemos = {
  id: "01a0d5f4-3c13-794f-976e-e5257f83f619",
  type: "page-type/temper-lore-collection",
  slug: "notes-and-memos",
  title: "Notes and Memos",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 12,
  esoLoreCollectionId: 55,
  loreCollectionDescription: "Informal communications and notes-to-self on scraps of paper.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 123,
} as const satisfies TemperLoreCollection
