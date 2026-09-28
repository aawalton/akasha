import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereSewersOfKastilla = {
  id: "01a0e9ba-0814-7273-8815-456a461494b8",
  type: "page-type/place",
  slug: "otherwhere-sewers-of-kastilla",
  title: "The Sewers of Kastilla",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-kastilla",
  facts: [
    {
      fact: "The Sewers of Kastilla are a dungeon of brick tunnels lit by old magitech lamps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zombie ratmen roam the tunnels, puppets of a red fungal parasite.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dungeon's recommended level is far above a fresh survivor's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its boss is a ratman foreman who keeps a battered, acid-eaten curved sword.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing the sewers grants a coat of dark red leather armor with a scale pattern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Items bound to the victor return with them to the tutorial when the dungeon ends.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
