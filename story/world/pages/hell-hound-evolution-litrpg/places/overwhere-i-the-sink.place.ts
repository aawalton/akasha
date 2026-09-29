import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereITheSink = {
  id: "01a0ed29-16a3-74e7-97ca-0a7601fc66c3",
  type: "page-type/place",
  slug: "overwhere-i-the-sink",
  title: "The Sink",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "The Sink is a new sinkhole in the deep Greyfen, a quarter mile west of the sunken shrine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It opened last spring, when a black pool drained into the ground in one night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a ragged pit forty paces across, its sides slick peat and roots over pale bedrock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Warm air that smells of rotten eggs breathes up out of it, and mist hangs over it on cold days.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At night a faint pale glow shows far down in it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one from Fenwatch has seen it; reed-cutters turn back well short of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The channels running from it are warm, and the fish in them have died.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
