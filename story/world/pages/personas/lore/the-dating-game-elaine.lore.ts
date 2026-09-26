import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameElaine = {
  id: "01a0de59-9645-7f4b-9543-e9e5be178d32",
  type: "page-type/lore",
  slug: "the-dating-game-elaine",
  title: "Elaine",
  world: "world/personas",
  about: "persona/elaine",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Elaine is a nurse in the emergency department at Utah Valley Hospital.",
    "Elaine works the early shift and swims laps at the Provo Recreation Center pool after, around four.",
    "Elaine died once on Earth, lived a second life as a Healer on Pallos, and came to Provo after.",
    "Elaine cannot walk past an injured stranger, and most of her neighbors know it.",
  ],
} as const satisfies Lore
