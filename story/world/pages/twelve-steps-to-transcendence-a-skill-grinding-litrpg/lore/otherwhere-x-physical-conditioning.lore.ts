import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXPhysicalConditioning = {
  id: "01a0ea78-8087-75ba-afe9-013d344ce005",
  type: "page-type/lore",
  slug: "otherwhere-x-physical-conditioning",
  title: "Physical Conditioning",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-physical-conditioning",
  facts: [
    {
      fact: "[Physical Conditioning] is a Common, purely passive bodily skill levelled by training.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It levels alongside [Mana Reinforcement].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With [Mana Reinforcement] it helps protect a frail Mana-path body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can be offered on reaching Tier 1 to someone who trained their body hard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Offer: "Would you like to learn the skill: [Physical Conditioning]?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It fuses with [Mana Reinforcement] and [Unarmed Combat] into the Rare [Warforged].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben gained it at Tier 1 and fused it away at level 8.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
