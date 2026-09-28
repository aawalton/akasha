import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinfordSmithy = {
  id: "01a0e9ff-99c7-7614-ac4b-d2b226c74de6",
  type: "page-type/place",
  slug: "otherwhere-v-serrinford-smithy",
  title: "Serrinford Smithy",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "Out the open front into the lane between the green and the Wood Gate.",
    },
  ],
  facts: [
    {
      fact: "Serrinford's smithy is an open-fronted forge under a bark-scale roof off the Wood Gate lane.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smithy has a stone forge, a leather bellows worked by a pole, and a quenching trough.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smith makes and mends axes, saw teeth, nails, hinges, knives and ranger arrowheads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smithy is short of iron; bar iron comes only on the Harrowmere trader's boat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smith lacks a bellows-hand since his apprentice went to the rangers and died at Thornmouth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the smithy a plain belt knife costs twelve tesk and a woodcutter's axe a lir and a half.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
