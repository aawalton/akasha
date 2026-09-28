import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereLegendaryClasses = {
  id: "01a0e9d5-e1d7-76d8-b44d-0acb11151164",
  type: "page-type/lore",
  slug: "otherwhere-legendary-classes",
  title: "Legendary and Unique Classes",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Legendary classes are the rarest ordinary offers, beyond Epic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unique Legendary classes are bestowed by cosmic powers on chosen champions.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
