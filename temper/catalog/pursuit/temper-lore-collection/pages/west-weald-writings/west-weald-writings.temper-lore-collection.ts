import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const westWealdWritings = {
  id: "01a0d60d-4ab1-798c-bb5b-36d5ccd3dfbe",
  type: "page-type/temper-lore-collection",
  slug: "west-weald-writings",
  title: "West Weald Writings",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 50,
  esoLoreCollectionId: 215,
  loreCollectionDescription:
    "Books, journals, documents, and other writings associated with the province of West Weald and locations along the Gold Road.",
  gamepadIcon: "/esoui/art/icons/icon_missing.dds",
  hidden: false,
  bookTotal: 126,
} as const satisfies TemperLoreCollection
