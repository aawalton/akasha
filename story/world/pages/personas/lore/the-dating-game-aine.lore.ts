import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAine = {
  id: "01a0de59-9644-7662-840e-5462ff860656",
  type: "page-type/lore",
  slug: "the-dating-game-aine",
  title: "Aine",
  world: "world/personas",
  about: "persona/aine",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Aine sells honey and summer fruit at the Pioneer Park farmers market on Saturday mornings.",
    "Aine keeps a smallholding orchard out west of Provo toward the Utah Lake shore.",
    "Aine is still a goddess of summer, and her stall's plants ripen a little faster than they should.",
    "Aine blesses customers one at a time, and regulars swear their gardens do better after.",
  ],
} as const satisfies Lore
