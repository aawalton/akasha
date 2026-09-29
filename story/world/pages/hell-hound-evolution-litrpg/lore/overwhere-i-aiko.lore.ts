import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIAiko = {
  id: "01a0ed26-ca96-74ef-8977-7537552a6aae",
  type: "page-type/lore",
  slug: "overwhere-i-aiko",
  title: "Aiko",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "Aiko is head servant to Rin Zaoh and tends the palace's monster guests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She comes from a northern valley village and was once a slave of the Iron March.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She bows with arms level and eyes hidden behind her sleeves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She tells the legend of Rin's origin, and spreads rumours about it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She seems to know secrets of the palace's hidden royal wing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fox annoys her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is in the Verdant palace now.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
