import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiNightsong = {
  id: "01a0e9cc-700a-7fdd-9276-352b9d5a889f",
  type: "page-type/lore",
  slug: "otherwhere-ii-nightsong",
  title: "Nightsong",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Nightsong is a dark-gray coyote beast with intelligent yellow eyes and noble features.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:54:44.490Z",
  updatedAt: "2026-09-28T22:34:49.000Z",
} as const satisfies Lore
