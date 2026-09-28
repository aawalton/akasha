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
} as const satisfies Lore
