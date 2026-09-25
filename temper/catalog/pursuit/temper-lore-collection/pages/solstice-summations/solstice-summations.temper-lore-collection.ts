import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const solsticeSummations = {
  id: "01a0d60d-ff6a-7ba5-8dd9-3fb1ffabe321",
  type: "page-type/temper-lore-collection",
  slug: "solstice-summations",
  title: "Solstice Summations",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 55,
  esoLoreCollectionId: 233,
  loreCollectionDescription:
    "Books, notes, letters, and other written material pertaining to life on the isolated island of Solstice's western half.",
  gamepadIcon: "/esoui/art/icons/icon_missing.dds",
  hidden: false,
  bookTotal: 86,
} as const satisfies TemperLoreCollection
