import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGravitite = {
  id: "01a0ea88-77ce-72d9-8fc5-4913b2c7fde3",
  type: "page-type/lore",
  slug: "otherwhere-xi-gravitite",
  title: "Gravitite",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-item/otherwhere-xi-gravitite",
  facts: [
    {
      fact: "Gravitite is a quartz-like stone that reverses gravity under intense mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gravitite, also called manatite, holds Helock's floating rocks in the sky.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gravitite loses its power if its vein is broken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helock forbids anyone to tamper with its floating rocks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gravitite is rare: a single stone was once credited as five years of service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brown archmages built Helock's great unsupported dome partly with gravitite.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gravitite is the material for floating platforms, and is found near Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Luten's scouting balloon was lifted by gravitite.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
