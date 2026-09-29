import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiDragonsPeak = {
  id: "01a0ea80-ba6a-7f74-8114-4e86139e53af",
  type: "page-type/place",
  slug: "otherwhere-xi-dragons-peak",
  title: "Dragon's Peak",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-new-harrak",
  facts: [
    {
      fact: "Dragon's Peak is a lone mountain above a coastal village of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dragon's Peak is the lair of Gale, called Old White Death, a white dragon and Avarice's brother.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gale's den on Dragon's Peak is a mess of carcasses and smells of fish and manure.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The village below Dragon's Peak grows cabbages; its folk wear straw hats and bake pies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers below Dragon's Peak tolerate their dragon and 'keep an eye out for things on fire'.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers below Dragon's Peak bet iron bits on the dragon's doings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv and Arthur once thrashed Gale on Dragon's Peak and scrubbed him with soap for misbehaving.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Village lads sometimes climb Dragon's Peak hoping to loot the dragon's treasure.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
