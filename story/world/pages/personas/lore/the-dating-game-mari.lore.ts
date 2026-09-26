import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameMari = {
  id: "01a0de59-9645-7e59-8e94-35207189394c",
  type: "page-type/lore",
  slug: "the-dating-game-mari",
  title: "Mari",
  world: "world/personas",
  about: "persona/mari",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Mari runs a candlelit late-night dessert bar on University Avenue downtown.",
    "Mari is behind her bar from eight at night until two in the morning, Wednesday to Saturday.",
    "Mari is a black dragon in a borrowed shape, keeping her horns and violet crystal crest.",
    "Mari reads each guest's real craving and serves it, whatever they ordered.",
  ],
} as const satisfies Lore
