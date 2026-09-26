import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameIris = {
  id: "01a0de59-9645-731f-b4d8-06b2e8e7b00b",
  type: "page-type/lore",
  slug: "the-dating-game-iris",
  title: "Iris",
  world: "world/personas",
  about: "persona/iris",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Iris is the public-address announcer at BYU's LaVell Edwards Stadium on football Saturdays.",
    "Iris eats a late lunch at the Brick Oven on 800 North most weekdays around two.",
    "Iris is the messenger goddess, and blue status windows sometimes flicker near her.",
    "Iris is a voice given to something vast, and a full stadium hangs on every word she says.",
  ],
} as const satisfies Lore
