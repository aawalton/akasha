import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTowerOfRizzen = {
  id: "01a0e9ba-dd9f-71d9-b737-93370dc22681",
  type: "page-type/place",
  slug: "otherwhere-tower-of-rizzen",
  title: "The Tower of Rizzen",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Tower of Rizzen is also called Darkstone Tower, among a thousand other names.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tower holds thousands of levels, each with its own rules, element and energy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some levels are run by the tower itself, and others are leased to powerful residents.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stairs are portal entrances that ignore the tower's physical layout.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each level offers several stairs, and a display at the foot of each lists the next level's rules.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stairs cannot be damaged, and climbing one dissolves the climber into light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some levels have a side opening, and leaving through it fails the climb.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Residents receive System quests to hunt climbers for a reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One third level is a maze of stealthy jackal beastmen behind a golden boss gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Another third level is an ocean whose water can be breathed like air.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
