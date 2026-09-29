import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiVolcanicIsland = {
  id: "01a0ed2f-54b6-734a-8582-f4082e3cf2cd",
  type: "page-type/place",
  slug: "overwhere-iii-volcanic-island",
  title: "The Volcanic Island",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-abylport",
      way: "Half a day's flight north over the sea.",
      direction: "north",
    },
    { way: "South to the warm southern coast of the Dominion." },
  ],
  facts: [
    {
      fact: "A volcanic island lies half a day's flight south of Abylport over the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An active volcano pours magma into the sea; the beaches are black sand and rock.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "The island is warm even in mid-winter.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A fire mana node lies at a rocky outcrop at its center.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fire wyvern of level 52 nests on the node.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Obsidian armadillos eat lava; obsidian crabs spew boiling water and taste good.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Screeching bat-like beasts and lava-eating bees also live there.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "The central volcano erupted this winter.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
} as const satisfies Place
