import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDalo = {
  id: "01a0e9f9-005c-7b7e-9343-b59dc67045fe",
  type: "page-type/lore",
  slug: "otherwhere-v-dalo",
  title: "Dalo",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-dalo",
  facts: [
    {
      fact: "Dalo is Stella's father, a spry, bearded mage of Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dalo casts a fusion spell by hugely compressing and heating air, not knowing why it works.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He nearly killed himself learning it, and insists anyone who sees it be healed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He and his wife Kullal use gravity or force mana and hold posts in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The family keeps a mansion with a garden in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Dalo lives in Gemore with Kullal and their daughter Stella.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
