import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiNaIkiri = {
  id: "01a0ed32-0da7-7cf9-909a-5299ba51bcaf",
  type: "page-type/lore",
  slug: "overwhere-iii-na-ikiri",
  title: "Na'ikiri",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-na-ikiri",
  facts: [
    {
      fact: "Na'ikiri is a young female antkin, a traveling merchant who fights with a bow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like all antkin she has two arms, four legs, mandibles and antennae, and speaks by clicks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She runs fast on four legs over sand and goes long without water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She was sole survivor of a caravan the Desert Shark Matriarch destroyed in the oasis dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liora's party saved her; she guided them some three weeks through the desert dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She calls Liora the gem-obsessed bird and Cee the scary magic spider.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "She rode Smokey with Cee on the crossing.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "She fears gateclaw scorpions; antkin never use an oasis where those gather.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now she is home in the antkin queendom beneath the Navaru desert.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
