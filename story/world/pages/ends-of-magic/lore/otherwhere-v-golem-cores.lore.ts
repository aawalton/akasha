import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGolemCores = {
  id: "01a0e9fa-7a11-74c9-a639-3b4e0385bf0a",
  type: "page-type/lore",
  slug: "otherwhere-v-golem-cores",
  title: "Golem Cores",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-golem-cores",
  facts: [
    {
      fact: "A golem core holds the artificial mana pool that powers a golem.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golem cores are graded by quality; grandmaster-quality empty cores are prized.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An empty golem core can receive a soul transferred into it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antimagic can drain and seal a golem core's mana pool in seconds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
