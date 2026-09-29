import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiOasisDungeon = {
  id: "01a0ed31-c669-7934-ae24-eacab52745d2",
  type: "page-type/place",
  slug: "overwhere-iii-oasis-dungeon",
  title: "The Oasis Dungeon",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-the-merfolk-city",
      way: "Back through the current from the first oasis to the merfolk gate.",
      direction: "up",
    },
    {
      to: "place/overwhere-iii-the-anthill",
      way: "Oasis to oasis across the desert, about three weeks, to the far exit.",
    },
  ],
  facts: [
    {
      fact: "The oasis dungeon is entered from the merfolk city through a drain-like current.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its first oasis has palms, bananas, freshwater pools with fish, and merfolk nets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A seawater basin at the first oasis is sealed off with plaster.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merfolk guard the entrance and the first oasis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside is a huge desert, crossed oasis to oasis in about three weeks.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Its layout changes from time to time.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Its days are blistering and its nights cold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Desert sharks swim through its sand; a great matriarch rules each pack.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gateclaw scorpions wall off oases with shield claws; antkin shun those oases.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Man-eating camels, sand snakes and two-headed vultures hunt there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A deadly beast visits the oases; weaker monsters drink fast and flee before it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its far exit opens into the antkin anthill under the Navaru desert.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antkin and merfolk caravans cross it to trade, some only once in half a year.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
