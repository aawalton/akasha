import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAura = {
  id: "01a0de51-2d5f-78f2-9cf4-34d92f811c5f",
  type: "page-type/lore",
  slug: "partners-ii-aura",
  title: "Aura",
  world: "world/personas",
  about: "character-other/partners-ii-aura",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Aura is Amberford's games-mistress.",
    "Aura runs the festival contests, the wager-boards and the annual Hearthlands race.",
    "Aura has never once been caught holding the house's edge.",
    "Aura is wind-quick.",
    "Aura is Titaness-old in the eyes, if you catch her between laughs.",
    "Aura is Amberford's read on risk.",
  ],
} as const satisfies Lore
