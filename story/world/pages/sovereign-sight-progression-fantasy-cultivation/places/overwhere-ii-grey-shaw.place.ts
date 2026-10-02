import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiGreyShaw = {
  id: "01a0fdc4-cd8c-7eb4-83bd-346c84d67b54",
  type: "page-type/place",
  slug: "overwhere-ii-grey-shaw",
  title: "Grey Shaw",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Grey Shaw is a birch wood on the valley road, a day below Wendle Ford and half a day below Ashlin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From Ashlin Farm to Grey Shaw is some twelve miles of road, running gently downhill.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The ruined tollhouse sits at the wood's near edge, roofless at one end, by an old toll bar.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Crake's stash lies under the tollhouse hearthstone: bottled Water, a coin box, and his ledger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tollhouse is empty tonight; all of Crake's band went to Ashlin Farm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anyone on the road reaches the tollhouse without a guide; the road runs past its door.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "A half moon rises an hour after dark, enough to see the pale road by.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
  ],
} as const satisfies Place
