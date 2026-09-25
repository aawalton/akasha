import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const finalWords = {
  id: "01a0d5f6-45ae-79ac-a785-82358c77768e",
  type: "page-type/temper-lore-collection",
  slug: "final-words",
  title: "Final Words",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 22,
  esoLoreCollectionId: 65,
  loreCollectionDescription: "Books, notes, and journals of the suicidal and the overconfident.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 78,
} as const satisfies TemperLoreCollection
