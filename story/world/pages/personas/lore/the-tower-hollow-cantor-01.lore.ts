import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerHollowCantor01 = {
  id: "01a0d44e-dae0-74f0-8df6-182a41c84d64",
  type: "page-type/lore",
  slug: "the-tower-hollow-cantor-01",
  title: "The Hollow Cantor",
  world: "world/personas",
  about: "character-other/the-tower-hollow-cantor-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Hollow Cantor is a wraith of folded sound whose song claws at the mind.",
    "The Hollow Cantor's song empties focus and will rather than wounding the body.",
    "A mind the Hollow Cantor has emptied is left dazed and cannot read what is before it.",
    "The Hollow Cantor is half air, so a physical blow to it barely matters.",
    "Each bronze plate toppled or shattered cuts the Hollow Cantor's reach.",
    "The silver whistle's note staggers the Hollow Cantor.",
    "The Hollow Cantor sings at whoever advances into the nave past the first pair of plates.",
  ],
} as const satisfies Lore
