import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaManipulation = {
  id: "01a0ea7a-2e1b-7d8a-96df-61334e5c01bf",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-manipulation",
  title: "Mana Manipulation",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-mana-manipulation",
  facts: [
    {
      fact: "[Mana Manipulation] is an Uncommon skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It was offered after raw mana was shaped into an arrow with no mental container.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Offer: "Would you like to learn the skill: [Mana Manipulation]?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can tune a sensing skill's frequency, such as [Mana Sonar]'s.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Construct work levels it fast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben holds it, at level 8.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
