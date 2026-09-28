import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDisadvantage = {
  id: "01a0e9f8-2dc4-7ed1-bb2d-afa5064c96df",
  type: "page-type/lore",
  slug: "otherwhere-v-disadvantage",
  title: "Disadvantage",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-disadvantage",
  facts: [
    {
      fact: "Davrar deems one of mature age with no Talents, classes or skills to be at a Disadvantage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Natives gain Talents and skills while growing up, so it falls mostly on those from elsewhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar announces the Disadvantage in the recognition box, with a capital D.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "While at a Disadvantage, one gets more explanations from Davrar than usual.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "While at a Disadvantage, class, Talent and skill gain and progression are accelerated.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The acceleration lasts until the person is no longer at a Disadvantage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under a Disadvantage, early levels and ranks come fast: level 1 to 3 in one night.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
