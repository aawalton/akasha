import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiCallowBeck = {
  id: "01a0f3f6-e45e-7c8b-bf50-9de75371f26a",
  type: "page-type/place",
  slug: "overwhere-ii-callow-beck",
  title: "Callow Beck",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Callow Beck is the highest farm on the Whitecombs side, a longhouse where a beck leaves the snow.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Ebba Callow, sixty and hard as a gatepost, keeps Callow Beck's goats with her two grandsons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ebba knows every goat track on the Whitecombs, and has climbed them since she could walk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At midwinter Ebba saw the snow in the high cwm above her farm melt black in one night.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Since midwinter Ebba's goats will not graze above the beck, and two that strayed never came back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The beck at Callow Beck has run faintly salt since midwinter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ebba sizes up a stranger in silence, then talks freely to anyone the Reeve sends.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ebba points out the goat track to the high cwm, but has not climbed above the beck since midwinter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ebba gives walkers a round of goat's cheese and warns them to be down off the mountain by dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
