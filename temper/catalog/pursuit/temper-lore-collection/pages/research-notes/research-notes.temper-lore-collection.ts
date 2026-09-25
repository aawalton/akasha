import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const researchNotes = {
  id: "01a0d5f5-1386-7f29-809e-f13924312f5a",
  type: "page-type/temper-lore-collection",
  slug: "research-notes",
  title: "Research Notes",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 15,
  esoLoreCollectionId: 58,
  loreCollectionDescription:
    "Notes and journals of magical researchers, explorers of Dwarven ruins, experimenters on human subjects, alchemical tracts, and so on.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 107,
} as const satisfies TemperLoreCollection
