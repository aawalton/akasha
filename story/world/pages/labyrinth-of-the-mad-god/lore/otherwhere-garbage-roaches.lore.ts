import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereGarbageRoaches = {
  id: "01a0e9c2-1a5a-7c36-b126-ea9cd9d98b36",
  type: "page-type/lore",
  slug: "otherwhere-garbage-roaches",
  title: "Garbage Roaches",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Garbage roaches are giant roach-ant hybrids bred to eat the tower's waste.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Acid-spewers fire acid that eats stone, and orange roaches breathe jets of flame.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Warrior roaches are twice normal size, heavily plated, with a weak seam on the back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A queen over thirty feet long commands them with mantis-blade forelimbs and a golden aura.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Roaches lose the will to fight once their queen dies.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
