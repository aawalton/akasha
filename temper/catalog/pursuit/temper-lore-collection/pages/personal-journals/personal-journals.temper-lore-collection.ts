import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const personalJournals = {
  id: "01a0d5f4-6f1b-74a6-8a1c-dd415750fd7c",
  type: "page-type/temper-lore-collection",
  slug: "personal-journals",
  title: "Personal Journals",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 13,
  esoLoreCollectionId: 56,
  loreCollectionDescription: "The activities, thoughts, and confessions of individual Tamrielics.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 107,
} as const satisfies TemperLoreCollection
