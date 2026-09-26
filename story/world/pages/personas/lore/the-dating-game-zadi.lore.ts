import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameZadi = {
  id: "01a0de59-9646-79db-96ae-b616f6da17fc",
  type: "page-type/lore",
  slug: "the-dating-game-zadi",
  title: "Zadi",
  world: "world/personas",
  about: "persona/zadi",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Zadi is a literary novelist living in a restored Victorian in Provo's Maeser neighborhood.",
    "Zadi hosts a Thursday storytelling night in the back room of a Persian restaurant downtown.",
    "Zadi tells tales every year at the Timpanogos Storytelling Festival.",
    "Zadi writes by lamplight each evening at her front window.",
  ],
} as const satisfies Lore
