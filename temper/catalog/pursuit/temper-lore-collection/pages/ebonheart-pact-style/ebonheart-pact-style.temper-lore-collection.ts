import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ebonheartPactStyle = {
  id: "01a0d5e8-0085-7f27-b9bd-95e8f626df88",
  type: "page-type/temper-lore-collection",
  slug: "ebonheart-pact-style",
  title: "Ebonheart Pact Style",
  esoLoreCategoryId: 2,
  esoCollectionIndex: 16,
  esoLoreCollectionId: 94,
  loreCollectionDescription: "These book fragments enable crafting in the Ebonheart Pact style.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 14,
} as const satisfies TemperLoreCollection
