import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiGatekeeper = {
  id: "01a0e9c7-1b29-743d-9d1d-538dc50db69b",
  type: "page-type/lore",
  slug: "otherwhere-ii-gatekeeper",
  title: "The Gatekeeper",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Gatekeeper is a titanic demigod who guards a crossing of the dead zone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It wears ruby-red armor that hides its features and bears a burning continent-sized sword.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System must negotiate with it before any world crosses.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
