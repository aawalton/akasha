import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXBrackwood = {
  id: "01a0ea72-d93e-70b9-9bbb-852d80fc647f",
  type: "page-type/place",
  slug: "otherwhere-x-brackwood",
  title: "The Brackwood",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow-vale",
  facts: [
    {
      fact: "The Brackwood is an old oak and beech forest along the north of Harrow Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its edge lies a mile north of the road; it runs a full day's journey deep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow folk gather wood and beechmast along its edge by day and never go deep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deer, boar, foxes, squirrels and horned rabbits live in it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The four forest wolves den in a rock tumble on the Brackwood's far side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wolf pack is a grey bitch who leads, two grown males, and a limping yearling.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wolves hunt the forest edge and the downs at night and lie up by day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wolves avoid fire and people in groups, but will close on one who is alone and hurt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tobin Marsh keeps a hunting hut an hour inside the wood, by a clear stream.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow Brook rises in the Brackwood at a spring the old folk call Stillwater.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Chestnuts, hazelnuts, blackberries and mushrooms can be had along the edge this season.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Among the mushrooms a pale-gilled kind looks like the good ones and sickens for days.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-harrow-mile",
      way: "south across a mile of stubble to the road",
      direction: "south",
    },
    {
      to: "place/otherwhere-x-harrow",
      way: "south-east along Harrow Brook, an hour's walk",
      direction: "south",
    },
  ],
} as const satisfies Place
