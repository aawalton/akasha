import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const probeTwoWorldHall = {
  id: "01a17fbf-aff5-7d1b-8748-30e80958f06d",
  type: "page-type/place",
  slug: "probe-two-world-hall",
  title: "Test Hall",
  world: "world/probe-two-world",
  depth: 0,
  exits: [
    {
      to: "place/probe-two-world-square",
      way: "Down the steps to the square.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The hall is one long room with a stone floor, a hearth and a notice board.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "Anyone may use the hall by day, and its long floor is clear enough to drill on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers sleep on cots by the hall's hearth and eat at its table.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
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
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies Place
