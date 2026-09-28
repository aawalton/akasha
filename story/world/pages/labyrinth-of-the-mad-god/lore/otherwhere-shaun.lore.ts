import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereShaun = {
  id: "01a0e9ca-01ea-7a38-9eae-53cab36fa187",
  type: "page-type/lore",
  slug: "otherwhere-shaun",
  title: "Shaun",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Shaun is a red-haired human contestant of Earth and a novice archer.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
