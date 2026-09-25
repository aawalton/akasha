import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theWorldAndItsCreatures = {
  id: "01a0d5f5-f3e5-7ae0-ace9-f19eec28c41e",
  type: "page-type/temper-lore-collection",
  slug: "the-world-and-its-creatures",
  title: "The World and Its Creatures",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 20,
  esoLoreCollectionId: 63,
  loreCollectionDescription:
    "Books about the many and varied environments of Tamriel and the creatures that live in them.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 80,
} as const satisfies TemperLoreCollection
