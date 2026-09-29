import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiTheAnthill = {
  id: "01a0ed31-c669-7ab1-97a1-82310a99e1c5",
  type: "page-type/place",
  slug: "overwhere-iii-the-anthill",
  title: "The Anthill",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-navaru-desert",
      way: "Up any of the many sand holes to the desert.",
      direction: "up",
    },
    {
      to: "place/overwhere-iii-oasis-dungeon",
      way: "From the entrance cavern into the merfolk's oasis dungeon.",
    },
  ],
  facts: [
    {
      fact: "The anthill is the antkin queendom's great nest, a city under the Navaru desert.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its entrance cavern opens onto six tunnels; many sand holes lead up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The far exit of the merfolk's oasis dungeon opens into it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its chambers serve for sleeping, eating, storage, aphids, mushrooms and broods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The queen's chamber lies deep; a deep mage chamber has an escape tunnel.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Its tunnels have no lights.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A restricted section is marked 'Antkin only!', and guests are turned back from it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Guest chambers exist, and guests are set to work like everyone else.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Queen rules with a council of twenty antkin of mixed castes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The council speaks the common tongue; the young queen El'akari sits on it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rot nearly wiped out the colony a year ago; it was cleared at great cost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Humans from the desert kingdom have twice crept in near the queen's chamber.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The council believes the humans mean to kill the queen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its guests now: a sigil-weaving spider, an ironscale wyvern and a merman ant doctor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
