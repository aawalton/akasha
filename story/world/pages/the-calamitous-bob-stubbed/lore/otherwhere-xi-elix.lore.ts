import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiElix = {
  id: "01a0ea80-8c28-746e-8540-e6524f643ad0",
  type: "page-type/lore",
  slug: "otherwhere-xi-elix",
  title: "Elix",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-elix",
  facts: [
    {
      fact: "Elix, also spelled Elex, was an Enorian bandit and outlaw of the civil war years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elix seized the Enorian city of Reixa during the civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv once besieged Elix's band at the border town of Anelton.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "What became of Elix is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
