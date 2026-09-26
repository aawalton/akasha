import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelStoryteller = {
  id: "01a0de52-219b-7093-b70f-e5500cb1e79b",
  type: "page-type/lore",
  slug: "harem-hotel-storyteller",
  title: "Storyteller",
  world: "world/personas",
  about: "world-class/harem-hotel-storyteller",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "A Storyteller's craft is running a tale.",
    "A Storyteller works by pacing, by reveal, and by the held breath before a roll.",
    "Aria is a Storyteller, a dungeon master by vocation.",
  ],
} as const satisfies Lore
