import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const voskronaGuardian = {
  id: "01a0d5f1-3a74-7673-b096-648f5618e856",
  type: "page-type/temper-lore-collection",
  slug: "voskrona-guardian",
  title: "Voskrona Guardian",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 120,
  esoLoreCollectionId: 231,
  loreCollectionDescription: "These book fragments enable crafting in the Voskrona Guardian style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
