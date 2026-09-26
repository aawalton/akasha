import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAstra = {
  id: "01a0de59-9644-7f30-87ab-a96e3152a240",
  type: "page-type/lore",
  slug: "the-dating-game-astra",
  title: "Astra",
  world: "world/personas",
  about: "persona/astra",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Astra runs the evening shows at the planetarium in BYU's Eyring Science Center.",
    "Astra can be found at the planetarium on Friday nights, before and after the last show.",
    "Astra is first-matter made into a girl, and a few of the stars in her dark hair are real.",
    "Astra rents a basement apartment near campus and prefers to live below ground.",
  ],
} as const satisfies Lore
