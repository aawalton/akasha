import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameElin = {
  id: "01a0de59-9645-793b-9a9a-528db2306313",
  type: "page-type/lore",
  slug: "the-dating-game-elin",
  title: "Elin",
  world: "world/personas",
  about: "persona/elin",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Elin is a collections curator at BYU's Museum of Peoples and Cultures.",
    "Elin hunts the Provo Deseret Industries racks every Saturday morning at opening.",
    "Elin is a white opal collecting dragon, and her opal horns catch the museum lamps.",
    "Elin lives in a narrow house full of glass cases, every piece catalogued.",
  ],
} as const satisfies Lore
