import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pendingRollTrialWorldHall = {
  id: "01a183cf-b828-7beb-9489-811c8bf1be39",
  type: "page-type/place",
  slug: "pending-roll-trial-world-hall",
  title: "Test Hall",
  world: "world/pending-roll-trial-world",
  depth: 0,
  exits: [
    {
      to: "place/pending-roll-trial-world-square",
      way: "Down the steps to the square.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The hall is one long room with a stone floor, a hearth and a notice board.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "Anyone may use the hall by day, and its long floor is clear enough to drill on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers sleep on cots by the hall's hearth and eat at its table.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "The hall's stone floor is kept swept and bare from end to end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall's hearth is at its far end, with cots beside it for travellers to sleep on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A table for meals stands near the hall's hearth, benches pushed in under it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall's notice board hangs on its wall, papers pinned across it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall's floor lies open between its door and hearth, wide enough to drill on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Place
