import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiKenji = {
  id: "01a0e9ca-01ea-7ff1-88c6-05268bf7dc64",
  type: "page-type/lore",
  slug: "otherwhere-ii-kenji",
  title: "Kenji",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Kenji is a human contestant of Earth who is over a hundred years old when the System arrives.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Integration restores him to the body of a fifty-year-old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has military experience and a calm, commanding presence.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
