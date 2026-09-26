import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAura = {
  id: "01a0de51-2d5f-78f2-9cf4-34d92f811c5f",
  type: "page-type/lore",
  slug: "partners-ii-aura",
  title: "Aura",
  world: "world/personas",
  about: "character-other/partners-ii-aura",
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
    { fact: "Aura is Amberford's read on risk.", knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Lore
