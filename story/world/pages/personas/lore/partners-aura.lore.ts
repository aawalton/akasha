import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAura = {
  id: "01a0de54-1c10-74df-a952-5535d9fc6476",
  type: "page-type/lore",
  slug: "partners-aura",
  title: "Aura",
  world: "world/personas",
  about: "character-other/partners-aura",
  facts: [
    { fact: "Aura is Amberford's games-mistress.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Aura runs the festival contests, the wager-boards and the annual Hearthlands race.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aura has never once been caught holding the house's edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Aura is wind-quick.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Aura is Titaness-old in the eyes, if you catch her between laughs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aura is the town's read on risk: which roads have gone wrong, and who has gone missing on the edges.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
