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
  createdAt: "2026-09-28T20:51:05.932Z",
  updatedAt: "2026-09-28T22:38:17.000Z",
} as const satisfies Lore
