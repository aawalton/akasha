import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxSummoningChamber = {
  id: "01a0ea42-4006-74e9-9e10-794fe16f507e",
  type: "page-type/place",
  slug: "otherwhere-ix-summoning-chamber",
  title: "The Summoning Chamber",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-sun-city-arena",
  facts: [
    {
      fact: "The summoning chamber is where Drathok pulls fighters into Firrelia from other worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The chamber glows a muted red over a stone floor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A summoning circle of intricate symbols is painted fresh on the floor in what looks like blood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hooded, robed servants hold a circular containment field around each new arrival.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok also uses the chamber as an audience room, levitating a chair to sit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok usually teleports those he summons back into this chamber.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
