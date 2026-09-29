import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXUnarmedCombat = {
  id: "01a0ea79-3e24-7dac-a8d8-48fd2ae21285",
  type: "page-type/lore",
  slug: "otherwhere-x-unarmed-combat",
  title: "Unarmed Combat",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-unarmed-combat",
  facts: [
    {
      fact: "[Unarmed Combat] is Common and neither passive nor active, an instinct grown by use.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It gives instinct for dodging, hip power, and a foe's weak balance points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can be offered mid-fight after learning how foes move and shifting weight to match.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Offer: "Would you like to learn the skill: [Unarmed Combat]?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It fuses with [Mana Reinforcement] and [Physical Conditioning] into the Rare [Warforged].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben learned it fighting goblins and fused it away at level 7.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
