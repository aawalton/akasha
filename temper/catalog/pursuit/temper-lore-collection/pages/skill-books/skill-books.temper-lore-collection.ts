import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const skillBooks = {
  id: "01a0d5f6-6d42-7e8c-bbba-f7fa4499832d",
  type: "page-type/temper-lore-collection",
  slug: "skill-books",
  title: "Skill Books",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 23,
  esoLoreCollectionId: 66,
  loreCollectionDescription: "Books that endow the reader with skill improvements.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 89,
} as const satisfies TemperLoreCollection
