import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelHaremHotelGameMaster = {
  id: "01a0de07-6a02-7613-8796-bf09d8fadd30",
  type: "page-type/lore",
  slug: "harem-hotel-harem-hotel-game-master",
  title: "Harem Hotel",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Hotel runs by a logic Alan has not yet seen.",
    "The Hotel's challenges are not random.",
    "The women the Hotel brings are not random.",
    "The System knows things it does not show.",
    "Every woman who joins Alan stays with him, and his household has no limit.",
    "A challenge room admits five fighters at a time, so Alan chooses who goes into each fight.",
  ],
} as const satisfies Lore
