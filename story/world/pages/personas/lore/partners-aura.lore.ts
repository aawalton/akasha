import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAura = {
  id: "01a0de54-1c10-74df-a952-5535d9fc6476",
  type: "page-type/lore",
  slug: "partners-aura",
  title: "Aura",
  world: "world/personas",
  about: "character-other/partners-aura",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Aura is Amberford's games-mistress.",
    "Aura runs the festival contests, the wager-boards and the annual Hearthlands race.",
    "Aura has never once been caught holding the house's edge.",
    "Aura is wind-quick.",
    "Aura is Titaness-old in the eyes, if you catch her between laughs.",
    "Aura is the town's read on risk: which roads have gone wrong, and who has gone missing on the edges.",
  ],
} as const satisfies Lore
