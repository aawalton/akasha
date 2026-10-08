import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiEventHorizon = {
  id: "01a0e9d2-c08d-797e-aca1-67c6d66239b2",
  type: "page-type/lore",
  slug: "otherwhere-ii-event-horizon",
  title: "Event Horizon",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Artifacts with enough essence can grow minds of their own.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:01:38.317Z",
  updatedAt: "2026-09-28T22:32:31.000Z",
} as const satisfies Lore
