import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const theTrialOfEyevea = {
  id: "01a06343-f9fa-7041-8479-380cad790bf0",
  type: "page-type/temper-lore-collection",
  slug: "the-trial-of-eyevea",
  title: "The Trial of Eyevea",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 7,
  esoLoreCollectionId: 10,
  loreCollectionDescription:
    "A Mages Guild collection of books found while completing the Mad God's trials.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_magic.dds",
  hidden: false,
  bookTotal: 4,
  books: "jsonl",
} as const satisfies TemperLoreCollection
