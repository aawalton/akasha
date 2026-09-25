import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const vivecs36Lessons = {
  id: "01a0d5f7-ccc2-7010-a65e-059c053becde",
  type: "page-type/temper-lore-collection",
  slug: "vivecs-36-lessons",
  title: "Vivec's 36 Lessons",
  esoLoreCategoryId: 3,
  esoCollectionIndex: 31,
  esoLoreCollectionId: 103,
  loreCollectionDescription:
    "The thirty-six lessons, or sermons, of the warrior-poet Vivec, living god of the Tribunal of Morrowind.",
  gamepadIcon: "/esoui/art/treeicons/gamepad/gp_tutorial_idexicon_morrowind.dds",
  hidden: false,
  bookTotal: 36,
} as const satisfies TemperLoreCollection
