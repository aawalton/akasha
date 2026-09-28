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
} as const satisfies Lore
