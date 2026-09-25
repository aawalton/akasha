import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const scholariumScribblings = {
  id: "01a0d60d-9a64-72b1-b2b7-9c4032987059",
  type: "page-type/temper-lore-collection",
  slug: "scholarium-scribblings",
  title: "Scholarium Scribblings",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 52,
  esoLoreCollectionId: 223,
  loreCollectionDescription:
    "Rare first-era tomes, mystic fables, and other esoterica from the legendary collection of Ulfsild's Scholarium beneath Eyevea.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_magic.dds",
  hidden: false,
  bookTotal: 72,
} as const satisfies TemperLoreCollection
