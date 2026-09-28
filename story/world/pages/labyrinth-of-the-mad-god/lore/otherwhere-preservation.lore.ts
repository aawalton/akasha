import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwherePreservation = {
  id: "01a0e9c6-337e-723c-bbb7-0d02e07668f8",
  type: "page-type/lore",
  slug: "otherwhere-preservation",
  title: "Preservation",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Preservation is a demigod known as the Labyrinth's counterweight to chaos.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
