import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const fargraveGuardianStyle = {
  id: "01a0d5ee-9217-7941-bf8a-8f80156d67ba",
  type: "page-type/temper-lore-collection",
  slug: "fargrave-guardian-style",
  title: "Fargrave Guardian Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 93,
  esoLoreCollectionId: 192,
  loreCollectionDescription: "These book fragments enable crafting in the Fargrave Guardian style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
