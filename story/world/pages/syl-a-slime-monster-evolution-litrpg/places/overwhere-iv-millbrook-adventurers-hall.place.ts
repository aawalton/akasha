import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvMillbrookAdventurersHall = {
  id: "01a0ed2b-a212-7024-b3fe-3508c04dd277",
  type: "page-type/place",
  slug: "overwhere-iv-millbrook-adventurers-hall",
  title: "Millbrook Adventurers' Hall",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Millbrook Adventurers' Hall is a small branch hall of the Adventurers Guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall is a narrow stone building on the square, with a guild sign over the door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The job board by the hall door holds pinned notices of work and bounties.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most jobs on the board are small: pest slimes, wolves, lost sheep, escorts and herbs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lately the board carries a goblin bounty and a warning about the east road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall has one clerk, Ilsa Crane, who keeps the counter, the ledger and the board.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall keeps an old affinity crystal, cracked across, on a shelf behind the counter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bronze registration costs one silver, and the new member receives a bronze tag.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bronze members may take small jobs and are paid through the hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For full affinity testing and higher ranks, people go to the guild branch in Aubrin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Brookside Four are the only adventurer party based at the hall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
