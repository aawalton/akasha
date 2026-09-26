import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameVera = {
  id: "01a0de59-9646-7ab9-af46-c82a3bbebec4",
  type: "page-type/lore",
  slug: "the-dating-game-vera",
  title: "Vera",
  world: "world/personas",
  about: "persona/vera",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Vera keeps a weaving studio in a converted house in Provo's Franklin neighborhood.",
    "Vera teaches a Wednesday-night weaving class at her studio, and newcomers are welcome.",
    "Vera is a Norse Norn, the one at the loom between what happened and what is owed.",
    "Vera finishes everything she starts, and her studio has no half-woven pieces in it.",
  ],
} as const satisfies Lore
