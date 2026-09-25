import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const mysteriesAndClues = {
  id: "01a0d5f4-07ba-7844-a7e7-8004e36626d9",
  type: "page-type/temper-lore-collection",
  slug: "mysteries-and-clues",
  title: "Mysteries and Clues",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 11,
  esoLoreCollectionId: 54,
  loreCollectionDescription:
    "Books about mysteries and puzzles, including codes, ciphers, clue books, proofs of guilt, and mysterious inscriptions.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 118,
} as const satisfies TemperLoreCollection
