import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVKullal = {
  id: "01a0e9fd-3be3-714e-b1fe-9aba30be9bd1",
  type: "page-type/lore",
  slug: "otherwhere-v-kullal",
  title: "Kullal",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-kullal",
  facts: [
    {
      fact: "Kullal is a slim foxfolk woman of Gemore, Stella's mother and Dalo's wife.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She and Dalo use gravity or force mana and hold posts in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Kullal lives in Gemore with Dalo and Stella.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
