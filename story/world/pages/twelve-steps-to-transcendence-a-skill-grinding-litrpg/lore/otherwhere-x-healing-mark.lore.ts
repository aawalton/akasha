import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXHealingMark = {
  id: "01a0ea7a-dd28-7e45-80fd-16223cb65fc6",
  type: "page-type/lore",
  slug: "otherwhere-x-healing-mark",
  title: "Healing Mark",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-healing-mark",
  facts: [
    {
      fact: "[Healing Mark] is a construct: [Regeneration]'s inscription set in a [Learning Model] frame.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It stores life mana and releases it on mental command.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has one socket, holds little, and shudders when overfilled.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It heals mana-burned hands and arms in the field.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Prompt: "Would you like to bind the [Healing Mark] construct?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"Congratulations! [Healing Mark] has been added as a construct!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It might later be reinforced with [Warforged]'s [Mana Reinforcement] aspect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben designed it overnight and bound it over his sternum; he is its only holder.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
