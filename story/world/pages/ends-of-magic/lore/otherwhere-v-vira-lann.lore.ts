import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVViraLann = {
  id: "01a0e9fb-fb54-7c6c-b22f-22c6766b6020",
  type: "page-type/lore",
  slug: "otherwhere-v-vira-lann",
  title: "Vira Lann",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-vira-lann",
  facts: [
    {
      fact: "Vira Lann is a young Questor of the Ashen Accord, light-skinned, with a short grey curly afro.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She wears chainmail and carries many daggers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is eager, blunt and careless with secrets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she is on the Ashen Accord's home continent, which she has never left.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
