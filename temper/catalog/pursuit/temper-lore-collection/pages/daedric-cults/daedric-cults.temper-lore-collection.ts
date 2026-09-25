import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const daedricCults = {
  id: "01a0d5f2-253c-7efb-b4ae-b71ce7e188cd",
  type: "page-type/temper-lore-collection",
  slug: "daedric-cults",
  title: "Daedric Cults",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 3,
  esoLoreCollectionId: 46,
  loreCollectionDescription: "Books, notes, and journals by and about Daedra worshipers.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_daedric.dds",
  hidden: false,
  bookTotal: 120,
} as const satisfies TemperLoreCollection
