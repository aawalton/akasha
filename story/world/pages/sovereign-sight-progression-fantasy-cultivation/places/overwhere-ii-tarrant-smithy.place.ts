import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiTarrantSmithy = {
  id: "01a0f3b8-4a9b-70d6-9122-e472ce50cce7",
  type: "page-type/place",
  slug: "overwhere-ii-tarrant-smithy",
  title: "Tarrant's Smithy",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendle-ford",
  facts: [
    {
      fact: "Hob Tarrant's smithy is an open-fronted stone shed on the ford road, its forge never let go out.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cold-iron nails and charms hang in rows along the smithy's back wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hob is deaf in his left ear; folk step to his right to be heard over the forge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hob takes half his price down on a commission, and the rest when the work is handed over.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
  ],
} as const satisfies Place
