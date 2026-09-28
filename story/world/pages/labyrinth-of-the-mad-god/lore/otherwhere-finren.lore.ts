import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereFinren = {
  id: "01a0e9ce-117f-7c83-8f95-59975e275d4b",
  type: "page-type/lore",
  slug: "otherwhere-finren",
  title: "Finren",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Finren is a dark-skinned, hairless archer who trains students under a green alien sun.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
