import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const craglornSecrets = {
  id: "01a0d5f1-c91c-7d67-a63a-8bc9d1b61474",
  type: "page-type/temper-lore-collection",
  slug: "craglorn-secrets",
  title: "Craglorn Secrets",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 1,
  esoLoreCollectionId: 44,
  loreCollectionDescription: "Mysteries and revelations from the no-man's-region of Craglorn.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 117,
} as const satisfies TemperLoreCollection
