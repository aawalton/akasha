import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiSkyswarmPirates = {
  id: "01a0e9c2-1a5b-7ec7-8a45-fdc19ea4039d",
  type: "page-type/lore",
  slug: "otherwhere-ii-skyswarm-pirates",
  title: "The Skyswarm Pirates",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Skyswarm Pirates are outlaws banished from worlds linked to the tower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They follow Taltos, prey on outsiders and kill for profit or sport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They fly everything from two-man skiffs to winged galleons with colorful sails.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their flagship is a kraken-class warship over two hundred feet long, painted sky blue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They keep glass-deaths, gem-shelled scorpions whose venom turns flesh to glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their captain is a veteran tier-2 warrior who wields blades of fire and ice.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
