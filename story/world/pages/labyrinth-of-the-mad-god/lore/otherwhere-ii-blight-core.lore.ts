import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiBlightCore = {
  id: "01a0e9d0-bfd5-7455-95cd-7d18af527fe1",
  type: "page-type/lore",
  slug: "otherwhere-ii-blight-core",
  title: "The Blight's Controlling Core",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Crimson Blight is steered by a single controlling core.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:59:27.061Z",
  updatedAt: "2026-09-28T22:30:51.000Z",
} as const satisfies Lore
