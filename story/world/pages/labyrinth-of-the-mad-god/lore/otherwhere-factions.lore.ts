import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereFactions = {
  id: "01a0e9d7-0503-7200-8c8f-567b677efb46",
  type: "page-type/lore",
  slug: "otherwhere-factions",
  title: "Factions",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Alliances need only agreement, but joining a faction is a serious commitment.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A person may belong to at most three factions and can never rejoin one they leave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Factions take a small share of members' essence to unlock skills for all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At faction level 1 one skill may be chosen, capped at 25.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faction level 3 allows a further faction skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A faction skill's cap rises past 25 only as the faction levels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leaving a faction loses its bonus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faction ranks include initiate and founder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Factions have a full name and a short title.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
