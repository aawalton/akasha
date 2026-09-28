import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxSunCityRooftop = {
  id: "01a0ea42-fcc1-7b9c-b8f2-ba9cb9c65fb1",
  type: "page-type/place",
  slug: "otherwhere-ix-sun-city-rooftop",
  title: "The Rooftop",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-sun-city",
  facts: [
    {
      fact: "The rooftop tops a two-storey building a few minutes' walk from the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the rooftop one sees Sun City's spires and hears its bars and singing drunks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serena brought Markus Brown here at evening to make him her Champion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Randall has set a conjured table and tea here to talk with Markus Brown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season it is night, and Randall and Markus Brown sit here negotiating terms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The streets below have fallen quiet around the meeting.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
