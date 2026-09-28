import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTowerBasement = {
  id: "01a0e9ba-dd9f-71da-b40a-779776eaba73",
  type: "page-type/place",
  slug: "otherwhere-tower-basement",
  title: "The Basement Waste Level",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-tower-of-rizzen",
  facts: [
    {
      fact: "The basement is a secret bonus level with second-level danger and a third-level reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its rule is escalating threat: the more its swarm is fought, the more it grows and adapts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The level is carved from bedrock and is the size of a major city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An outer ring tunnel thirty feet wide runs for dozens of miles past thousands of rooms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the center, portals drop corpses and waste onto conveyors of force magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Labs, offices, a cafeteria for a thousand, dormitories and factory halls line the rings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sealed storeroom event lets visitors grab basic supplies for fifteen minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three powers wage an endless garbage war: a construct swarm, giant roaches and a monster.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
