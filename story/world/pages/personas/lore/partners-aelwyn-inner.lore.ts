import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAelwynInner = {
  id: "01a0de54-1c10-7f2c-aa85-5be94964e4d0",
  type: "page-type/lore",
  slug: "partners-aelwyn-inner",
  title: "What Aelwyn keeps to herself",
  world: "world/personas",
  about: "character-other/partners-aelwyn",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Aelwyn's Talent is Wildmarriage.",
    "Hearthholt has gone attentive around Aelwyn.",
    "The house is attentive the way a wood is around something it has decided it likes.",
    "Aelwyn cannot read why the house is attentive to her, and has stopped needing to.",
    "Aelwyn has a deeper read of Amy she has not spoken.",
    "The walled garden was Aelwyn's favorite forbidden place, and is now hers.",
    "The fourth key turned a door Aelwyn never had.",
  ],
} as const satisfies Lore
