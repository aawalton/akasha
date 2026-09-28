import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinfordSawyard = {
  id: "01a0e9ff-99c7-7fe3-bd3d-15b7ca87656e",
  type: "page-type/place",
  slug: "otherwhere-v-serrinford-sawyard",
  title: "Serrinford Sawyard",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "Up the landing and in through the River Gate, a hundred paces.",
      direction: "north",
    },
    {
      to: "place/otherwhere-v-serrin-river",
      way: "Down the raft slip into the Serrin.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The sawyard lies just outside the River Gate, on the bank below the village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sawyard has two saw pits, great stacks of scalebark logs, and a raft slip into the river.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pairs of sawyers rip logs into beams and planks, one man in the pit and one on top.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Logs are lashed into rafts at the slip and poled down to Harrowmere with the trader's boat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sawyard pays six tesk a day for a pit hand, the dirtiest work in the village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sawyard is thick with sawdust, resin smell and the rasp of saws from dawn to dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
