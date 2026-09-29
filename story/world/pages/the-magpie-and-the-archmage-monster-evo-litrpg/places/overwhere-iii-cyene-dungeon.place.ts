import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiCyeneDungeon = {
  id: "01a0ed2d-97f5-7741-978a-6ee9da3b49aa",
  type: "page-type/place",
  slug: "overwhere-iii-cyene-dungeon",
  title: "Cyene Dungeon",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-cyene",
      way: "Back up the warded tunnel into the city.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "Cyene Dungeon is a beginner dungeon, the easiest in its region, outside Cyene's walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From above it is a giant rocky dome with openings, larger than the city, set in forest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A warded tunnel from the city leads to an entrance cavern of shops and Guild storage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The entrance holds guards, an infirmary, the Guild Merchant, a pub and a potion shop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The potion shop sells health potions; one glimmerstone buys a high-quality one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside, a vast cavern of glowing stalactites holds about eight levels of paths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Areas are lettered by difficulty, from G, the easiest, to A; Area C is reached high up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Area G holds kobold tunnels, a glowshroom cavern and a crystal cavern of gem crabs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kobolds swarm and breed like rats; there is no such thing as a lone kobold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Area F is an underground forest of glowing blue pines, several kilometers across.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crossing Area F takes two or three days, past lupus deer, goblins and a chasm maze.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Cave Badger, Area F's guardian, tests young adventurers and takes food as bribes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Defeating the badger, as it judges, is Cyene's Bronze advancement quest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huge, smelly cave catfish are caught in the dungeon and eaten in Cyene.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Corrupted kobolds swarmed Area G last autumn, and newbie parties went missing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Area F was blighted last autumn; it has been cleansed and its air is clean again.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
