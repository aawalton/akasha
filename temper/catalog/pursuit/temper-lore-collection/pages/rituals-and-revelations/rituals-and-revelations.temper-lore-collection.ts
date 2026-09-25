import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const ritualsAndRevelations = {
  id: "01a0d5f5-444d-7398-8e39-6ba5853f3000",
  type: "page-type/temper-lore-collection",
  slug: "rituals-and-revelations",
  title: "Rituals and Revelations",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 16,
  esoLoreCollectionId: 59,
  loreCollectionDescription:
    "Spells and rituals, instructions for operating infernal devices, grimoires and spellbooks, and treatises on magical history.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_magic.dds",
  hidden: false,
  bookTotal: 94,
} as const satisfies TemperLoreCollection
