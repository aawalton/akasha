import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiAnelton = {
  id: "01a0ea88-4593-7ae4-a99b-4b38bd4829fe",
  type: "page-type/place",
  slug: "otherwhere-xi-anelton",
  title: "Anelton",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Anelton is a palisaded Enorian border town where the Deadshield road enters the woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anelton was ravaged in Enoria's civil war; the bandit Elex was once besieged there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Refugees bound for Harrak wait at Anelton before crossing the woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Troops and refugees are the main travellers through Anelton.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anelton's innkeeper sells tents at three times their price.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Harrakan portal gate at Anelton links to its twin at Halfway Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "King Sangor and Viv sealed their first pact at Anelton, about ten years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anelton is also spelled Aneston or Arleton.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
