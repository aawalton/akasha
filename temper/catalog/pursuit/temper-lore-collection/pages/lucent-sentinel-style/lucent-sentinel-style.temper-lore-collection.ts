import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const lucentSentinelStyle = {
  id: "01a0d5f0-9466-7186-af89-49d74b972f6c",
  type: "page-type/temper-lore-collection",
  slug: "lucent-sentinel-style",
  title: "Lucent Sentinel Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 112,
  esoLoreCollectionId: 220,
  loreCollectionDescription: "These book fragments enable crafting in the Lucent Sentinel style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
