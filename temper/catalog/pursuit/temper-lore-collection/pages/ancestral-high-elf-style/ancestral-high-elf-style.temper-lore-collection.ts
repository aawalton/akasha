import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ancestralHighElfStyle = {
  id: "01a0d5ec-fcdd-7f94-be00-4b12b550d544",
  type: "page-type/temper-lore-collection",
  slug: "ancestral-high-elf-style",
  title: "Ancestral High Elf Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 73,
  esoLoreCollectionId: 167,
  loreCollectionDescription:
    "These book fragments enable crafting in the Ancestral High Elf style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
