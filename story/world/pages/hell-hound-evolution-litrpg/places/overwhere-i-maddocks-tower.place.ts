import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIMaddocksTower = {
  id: "01a0ed28-95cd-7959-98b7-ef73dfc2859a",
  type: "page-type/place",
  slug: "overwhere-i-maddocks-tower",
  title: "Maddock's Tower",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "Maddock's Tower is a ruined march watchtower on a spur of the Greyback, north of the ridge track.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is half an hour north along the ridge from where the track tops the crest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its round stone shell is three storeys high; its roof and upper floors have fallen in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stone stair winds up inside the wall to a broken parapet overlooking the whole Greyfen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The first lords of the march built it to watch the fen, and it was abandoned sixty years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fenwatch children dare each other to touch its gate; adults say a sergeant hanged himself there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ravens nest in the stair, and Blackbriar Brutes have denned in its cellar before.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its cellar holds rusted spearheads, a dented march shield, a fallen signal brazier and old crates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At night a faint pale glow shows from its parapet over the deep fen far to the west.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
