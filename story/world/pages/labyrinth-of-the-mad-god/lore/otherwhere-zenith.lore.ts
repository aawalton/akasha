import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereZenith = {
  id: "01a0e9c9-1a4c-7a57-977f-a90231ee56f4",
  type: "page-type/lore",
  slug: "otherwhere-zenith",
  title: "Zenith the Demon",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Demons of other dimensions cannot manifest in this world without a willing host.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
