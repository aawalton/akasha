import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const testWorldHall = {
  id: "01a17ec5-127c-7c95-8abc-8383ca570a2c",
  type: "page-type/place",
  slug: "test-world-hall",
  title: "Test Hall",
  world: "world/test-world",
  depth: 0,
  exits: [
    { to: "place/test-world-square", way: "Down the steps to the square.", direction: "south" },
  ],
  facts: [
    {
      fact: "The hall is one long room with a stone floor, a hearth and a notice board.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anyone may use the hall by day, and its long floor is clear enough to drill on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers sleep on cots by the hall's hearth and eat at its table.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
    {
      fact: "The hall's stone floor is kept swept and bare from end to end.",
      knowers: ["lore-disclosure/game-master", "character-player/clone-probe-player"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T22:04:57.023Z",
} as const satisfies Place
