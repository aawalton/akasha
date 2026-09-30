import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiHollowTarn = {
  id: "01a0ed1d-cfb3-756e-9c7c-867aa9cb9f79",
  type: "page-type/place",
  slug: "overwhere-ii-hollow-tarn",
  title: "Hollow Tarn",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Hollow Tarn is a black mountain lake in a corrie above Tern Hollow, an hour's climb.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No fish live in Hollow Tarn and no bird lands on it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In still weather the tarn smells faintly of the sea, though the sea is two days west.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Worn stone steps run down into the tarn on its east shore and on into the dark water.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Valley folk say a drowned shrine lies under the tarn, older than the faith of the Ancestors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shepherds hang cold iron on the cairn at the top of the tarn path and go no further.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liss Aske drowned in the tarn fifty-one winters ago, and her body was never found.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Since midwinter folk have seen pale green lights under the tarn on moonless nights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ice on the tarn broke up in one night at midwinter and has not formed since.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Within sight of Hollow Tarn, Nala's well stirs and leans toward the water, like a tide to the moon.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "When Nala draws or pushes beside the tarn, its water ripples toward her against the wind.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "From Hollow Tarn down to Wendle Ford is some three hours on foot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollow Tarn is a black lake in grey crags; no bird calls there, and the air smells of the sea.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
