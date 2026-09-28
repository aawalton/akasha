import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiDeadZone = {
  id: "01a0e9bf-c1f4-73f8-aabd-fd047b77016b",
  type: "page-type/place",
  slug: "otherwhere-ii-dead-zone",
  title: "The Dead Zone",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The dead zone is a jagged rift of emptiness between System space and the Labyrinth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only a handful of channels cross it, and each is blocked by a gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A world moved into the Labyrinth loses its link to the System's portal web.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
