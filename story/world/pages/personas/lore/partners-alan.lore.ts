import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de54-1c10-72f9-8cfc-6f0565cec852",
  type: "page-type/lore",
  slug: "partners-alan",
  title: "Alan",
  world: "world/personas",
  about: "character-player/partners-alan",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Alan reads things the way an experimenter does, with his heart plain under the lab coat.",
    "Alan's Talent is The Link.",
    "On the second day's evening Alan welcomed Aelwyn to be at home in Hearthholt, with him and Amy.",
    "Alan and Amy mean to see to Hearthholt's deed and go to market on the third day.",
    "Alan has promised Amy a night together, soon.",
  ],
} as const satisfies Lore
