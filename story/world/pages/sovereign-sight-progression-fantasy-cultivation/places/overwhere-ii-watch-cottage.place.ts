import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiWatchCottage = {
  id: "01a0f3dc-9afb-7ec8-ac37-d43f3367898e",
  type: "page-type/place",
  slug: "overwhere-ii-watch-cottage",
  title: "The Watch Cottage",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendle-ford",
  facts: [
    {
      fact: "The watch cottage is a squat stone house by the ford, one room with a sleeping loft and a hearth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The watchman the greymaws took lived in the watch cottage; it has been empty since midwinter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The watch cottage belongs to the Reeve's office, and whoever keeps it pays no rent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Whoever keeps the watch cottage answers the Reeve's call when Aberrants come into the valley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The watch cottage has a rope bed, a table, a cold hearth and the dead watchman's few pots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dray lets Nala sleep in the watch cottage while she works for him, and asks nothing for it.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
  ],
} as const satisfies Place
