import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameDalla = {
  id: "01a0de59-9645-72f2-b1bb-3f2e2a09e55f",
  type: "page-type/lore",
  slug: "the-dating-game-dalla",
  title: "Dalla",
  world: "world/personas",
  about: "persona/dalla",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Dalla works the viewing platform at Bridal Veil Falls in Provo Canyon on summer afternoons.",
    "Dalla is a Norse goddess of passage, and the falls' rainbow is her own fire in the spray.",
    "Dalla can be found at the Bridal Veil Falls footbridge most afternoons from two until sunset.",
    "Dalla repairs the footbridges below Bridal Veil Falls at night, when no one is crossing.",
  ],
} as const satisfies Lore
