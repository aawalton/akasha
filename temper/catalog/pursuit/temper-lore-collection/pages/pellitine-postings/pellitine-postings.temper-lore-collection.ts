import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const pellitinePostings = {
  id: "01a0d60b-4e03-72db-a004-fea6c6853664",
  type: "page-type/temper-lore-collection",
  slug: "pellitine-postings",
  title: "Pellitine Postings",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 38,
  esoLoreCollectionId: 151,
  loreCollectionDescription:
    "Lore books, notes, journals, and memoranda associated with the southern region of Elsweyr.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_places.dds",
  hidden: false,
  bookTotal: 78,
} as const satisfies TemperLoreCollection
