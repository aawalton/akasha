import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaSense = {
  id: "01a0ea78-8086-7f2d-9df9-490210e10fa1",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-sense",
  title: "Mana Sense",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-mana-sense",
  facts: [
    {
      fact: "[Mana Sense] is a Common active skill fed with mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lets a user feel mana, such as a strong mage gathering mana nearby.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It levels slowly until the user has and senses their own mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It makes internal mana control easier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Putting essence heavily into the Mana path can grant it on advancement.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Offer: "Would you like to learn the skill: [Mana Sense]?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At level 10 its paths: a straight upgrade, [Mana Tracing], [Mana Perception], [Mana Sonar].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its evolved forms keep its sensing aspect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben gained it at Tier 1 and evolved it into the Uncommon [Mana Sonar].",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
