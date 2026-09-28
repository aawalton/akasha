import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxTothCastle = {
  id: "01a0ea3f-b661-71a6-8957-4657f7931a3f",
  type: "page-type/place",
  slug: "otherwhere-ix-toth-castle",
  title: "Baron Toth's Castle",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-malari",
  facts: [
    {
      fact: "Baron Samell Toth's castle is a grand castle on a hill in Malari, with gardens and serfs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The castle is run by Steward Marley, who served Toth's father before him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Toth keeps a court enchanter at the castle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers are invited to the castle with gifts and offers of private meetings with the baron.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Toth keeps a creature bought from Elasar at the castle; it looked cuddly and plush when sold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Toth is at his castle, uneasy that the creature's Ring of Control is failing.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
