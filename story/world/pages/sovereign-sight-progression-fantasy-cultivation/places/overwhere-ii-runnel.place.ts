import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiRunnel = {
  id: "01a0ed24-bdd3-7492-b04c-a3da753367d2",
  type: "page-type/place",
  slug: "overwhere-ii-runnel",
  title: "Runnel",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Runnel is a settlement west of Creston, south of Haver Hill; wild land lies all around.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Runnel sent at least one Chartermarked Aspirant south this year.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T12:30:03.219Z",
  updatedAt: "2026-09-29T12:30:06.000Z",
} as const satisfies Place
