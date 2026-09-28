import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXAscension = {
  id: "01a0ea74-83ee-7a6f-b631-8bb774a983b3",
  type: "page-type/lore",
  slug: "otherwhere-x-ascension",
  title: "The Path of Ascension",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-ascension",
  facts: [
    {
      fact: "Climbing the Tiers is called the Path of Ascension; those climbing are called ascenders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Path of Ascension pursues personal strength.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Mages on the path chase "the truth of the Door".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many ascenders stall after Tier 3, where the Door's pull turns dangerous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 5 is expected to reach immortality at the next Tier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lady Eris of House Vane is a Tier 5 mage, near immortality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobles see ascension as a birthright and scorn commoners who walk the path.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mages consider dirtying one's hands with physical combat pathetic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Academies teach ascenders of all ages about the System, skills and mana.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
