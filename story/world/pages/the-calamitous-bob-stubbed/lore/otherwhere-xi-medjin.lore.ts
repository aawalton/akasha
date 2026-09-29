import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMedjin = {
  id: "01a0ea7d-3779-7a2a-b1db-858eea9050e6",
  type: "page-type/lore",
  slug: "otherwhere-xi-medjin",
  title: "Medjin",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-medjin",
  facts: [
    {
      fact: "Prince Medjin of Glastia was Sidjin's brother and his enemy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Medjin is dead, killed in the blast at the beastlings' ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Medjin was an heir in the Glastian contest, backed by the guilds and militia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Medjin insulted Viv in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Medjin's nephew murdered Sidjin's merl friend Siul on Glastia's wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "House Redclaw of Glastia backed Medjin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Medjin sabotaged Harrak's supply portal in the Glastian purge, and was exposed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
