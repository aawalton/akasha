import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiPhaarRegion = {
  id: "01a0ed23-0d31-7967-9303-008ebdb28008",
  type: "page-type/place",
  slug: "overwhere-ii-phaar-region",
  title: "Phaar Region",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Phaar Region is six islands across the northern waters of Teyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Phaar Region includes Liir and Kesca Isle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Phaar Region's Travelspire is Travelspire #03, at Vodaten on Kesca Isle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anyone in the Phaar Region when Threllsnacht begins is assigned to it and locked to it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Phaar is thought a backwater that cannot compete with the southern regions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Phaar leaderboard is topped by Temra Kalkos; a young noble of the south ranks fourth.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
