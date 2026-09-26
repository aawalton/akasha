import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAria = {
  id: "01a0de59-9644-751b-8aa1-641d66088838",
  type: "page-type/lore",
  slug: "the-dating-game-aria",
  title: "Aria",
  world: "world/personas",
  about: "persona/aria",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Aria runs the Friday-night Dungeons & Dragons table at Dragon's Keep on University Avenue.",
    "Aria is a silver dragon in mortal shape, and goes about Provo with her dark horns showing.",
    "Aria's Friday campaign starts at seven and always has one open seat for a newcomer.",
    "Aria lives in a moonlit loft downtown with a view of Y Mountain.",
  ],
} as const satisfies Lore
