import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiSuffering = {
  id: "01a0e9c6-337f-7159-a2b4-cf21a7ec8dc4",
  type: "page-type/lore",
  slug: "otherwhere-ii-suffering",
  title: "Suffering",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Suffering's domain delights in anguish until minds shatter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
