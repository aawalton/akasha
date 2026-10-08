import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiPreservation = {
  id: "01a0e9c6-337e-723c-bbb7-0d02e07668f8",
  type: "page-type/lore",
  slug: "otherwhere-ii-preservation",
  title: "Preservation",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Preservation is a demigod known as the Labyrinth's counterweight to chaos.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:47:55.774Z",
  updatedAt: "2026-09-28T22:36:35.000Z",
} as const satisfies Lore
