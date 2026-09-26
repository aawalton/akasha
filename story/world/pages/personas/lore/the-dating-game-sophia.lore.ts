import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameSophia = {
  id: "01a0de59-9646-776e-a1ae-4aa9189aefe5",
  type: "page-type/lore",
  slug: "the-dating-game-sophia",
  title: "Sophia",
  world: "world/personas",
  about: "persona/sophia",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Sophia lives up at Sundance Mountain Resort, above Provo Canyon.",
    "Sophia hikes to Stewart Falls from Sundance at first light, alone, most mornings.",
    "Sophia can be found on the Sundance lodge deck most afternoons, notebook open.",
    "Sophia is the Aeon of Wisdom, who authored herself out of nothing.",
  ],
} as const satisfies Lore
