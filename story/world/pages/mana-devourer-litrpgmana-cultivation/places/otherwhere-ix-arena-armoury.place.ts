import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxArenaArmoury = {
  id: "01a0ea42-4001-7cb5-b069-7ede46d3f5e4",
  type: "page-type/place",
  slug: "otherwhere-ix-arena-armoury",
  title: "The Arena Armoury",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-dungeon",
  facts: [
    {
      fact: "The armoury is a torchlit room beneath the arena, by the passage to the fighters' gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spears, axes, maces, morningstars, kunai, daggers and swords hang there, some rusted or bloody.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A purple, tentacle-faced guard sits at a desk and opens the metal grate to the gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The armoury guard is deadpan and helps no one without coin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Torches light themselves as a fighter walks the passage out to the sand.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
