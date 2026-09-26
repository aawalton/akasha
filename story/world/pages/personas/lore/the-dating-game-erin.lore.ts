import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameErin = {
  id: "01a0de59-9645-7938-9242-d296d43255b1",
  type: "page-type/lore",
  slug: "the-dating-game-erin",
  title: "Erin",
  world: "world/personas",
  about: "persona/erin",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Erin keeps the Hines Mansion Bed and Breakfast in downtown Provo as its innkeeper.",
    "Erin plays chess with any guest or passerby in the Hines Mansion parlor after dinner.",
    "Erin can be found on the Hines Mansion porch most evenings, a chessboard set up beside her.",
    "Erin wears a witch's hat made of pure flame that almost nobody in Provo can see.",
  ],
} as const satisfies Lore
