import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiObeliskPoint = {
  id: "01a0e99b-64b1-76b5-841f-c3b0e55970d2",
  type: "page-type/place",
  slug: "otherwhere-ii-obelisk-point",
  title: "Obelisk Point",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-cinder-isle",
  facts: [
    {
      fact: "Obelisk Point is the black rock headland closing the Black Shore to the north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies some three miles north along the sand from where Nala came to.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On its crown sits a jet-black obelisk some fifteen feet tall on a stone platform.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A third of the way up the obelisk's sea face is a dark glass panel like a kiosk screen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The obelisk's shady side is cool to lean on even at noon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the point the whole west coast and the smoking peak can be seen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
