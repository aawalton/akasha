import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiVeronica = {
  id: "01a0e9c9-1a4c-76f2-bb61-db9cd324eca6",
  type: "page-type/lore",
  slug: "otherwhere-ii-veronica",
  title: "Veronica",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Veronica, called V, is a quick, blunt human contestant of Earth.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
