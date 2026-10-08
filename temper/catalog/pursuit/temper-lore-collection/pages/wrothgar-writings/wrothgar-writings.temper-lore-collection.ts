import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const wrothgarWritings = {
  id: "01a0d5f6-d68c-7fa5-b94b-82891a61285c",
  type: "page-type/temper-lore-collection",
  slug: "wrothgar-writings",
  title: "Wrothgar Writings",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 25,
  esoLoreCollectionId: 68,
  loreCollectionDescription:
    "Discourses savage and sophisticated from the border realm of Wrothgar.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_lorelibrary_categoryicon_craftingstyle.dds",
  hidden: false,
  bookTotal: 115,
  createdAt: "2026-09-25T00:28:38.924Z",
  updatedAt: "2026-09-25T00:28:41.000Z",
} as const satisfies TemperLoreCollection
