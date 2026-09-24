import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheWelcomersPair01 = {
  id: "01a0d451-8d6c-79e9-9b55-b8299edfe202",
  type: "page-type/lore",
  slug: "the-tower-the-welcomers-pair-01",
  title: "The Welcomers",
  world: "world/personas",
  about: "character-other/the-tower-the-welcomers-pair-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Welcomers are two of the Welcomer's kind, hunting as one.",
    "One of the Welcomers holds its prey's eye while the other circles to its prey's back.",
    "Whoever fixes on one of the Welcomers is taken from behind by the other.",
    "The Welcomers carry burns and wounds from Alan's fire and flail.",
    "A back kept to a mirror or a wall denies the Welcomers their flank.",
    "The Welcomers can be split, one lured past a mirror away from the other.",
    "The Welcomers act together when someone enters the Long Gallery or engages either of them.",
  ],
} as const satisfies Lore
