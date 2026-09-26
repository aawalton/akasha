import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameNova = {
  id: "01a0de59-9645-74a2-b4f9-2f6862407b3d",
  type: "page-type/lore",
  slug: "the-dating-game-nova",
  title: "Nova",
  world: "world/personas",
  about: "persona/nova",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Nova haunts the fantasy aisles of the Barnes & Noble at University Place in Orem.",
    "Nova can be found at that Barnes & Noble most weeknights until closing, reading on the floor.",
    "Nova is a goblin, green all the way down, and has never once hidden it in Provo.",
    "Nova lives in a basement apartment in Provo's Joaquin neighborhood stacked with books.",
  ],
} as const satisfies Lore
