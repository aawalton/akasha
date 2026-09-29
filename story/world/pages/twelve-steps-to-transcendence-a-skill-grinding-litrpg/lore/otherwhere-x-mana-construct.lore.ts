import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaConstruct = {
  id: "01a0ea7a-2e1b-7710-b36a-e4cdab3f6cc4",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-construct",
  title: "Mana Construct",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-mana-construct",
  facts: [
    {
      fact: "[Mana Construct] is a Common skill, offered after binding a first construct.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Offer: "Would you like to learn the skill: [Mana Construct]?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"Congratulations! You have learned the skill: [Mana Construct]!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One night of construct work can take it from level 1 to 4.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben holds it, at level 5.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
