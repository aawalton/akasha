import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVPine = {
  id: "01a0e9ff-cb81-723e-9f76-31c0c5c19e00",
  type: "page-type/lore",
  slug: "otherwhere-v-pine",
  title: "Pine",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-pine",
  facts: [
    {
      fact: "Pine forest surrounds Taeol's tower in Elothia, a continent of forests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The road to Taeol's tower winds through scraggly pines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scouting teams from Gemore range through the pine forests of Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:50:50.241Z",
  updatedAt: "2026-09-28T21:50:54.000Z",
} as const satisfies Lore
