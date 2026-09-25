import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const handbillsPostersAndDecrees = {
  id: "01a0d5f2-83a4-7f9e-bdcc-cf276ce9c712",
  type: "page-type/temper-lore-collection",
  slug: "handbills-posters-and-decrees",
  title: "Handbills, Posters, and Decrees",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 5,
  esoLoreCollectionId: 48,
  loreCollectionDescription:
    "Wanted posters, arena broadsheets, bounty flyers, warning signs, gravestone epitaphs, official announcements, inscriptions over doorways, and so forth.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_literature.dds",
  hidden: false,
  bookTotal: 121,
} as const satisfies TemperLoreCollection
