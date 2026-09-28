import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxArenaCells = {
  id: "01a0ea42-7b40-772d-9e68-256a65f70b7a",
  type: "page-type/place",
  slug: "otherwhere-ix-arena-cells",
  title: "The Arena Cell Blocks",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-dungeon",
  facts: [
    {
      fact: "The cell blocks are torchlit rows of barred stone cells with no windows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The blocks stretch for minutes of walking each way, and guards rarely pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Guards carry nightsticks and bang the bars; a huge fish-folk guard walks one block.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Prisoners are moved on ethereal chains that dampen their mana and their system.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monsters and captives of every kind are caged here, some unseen but heard at night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods may visit prisoners in the cells by paying the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Markus Brown's cell lies far along a block, in a guards' blind spot, with a fine bed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The orc Cyrus's cell faces Markus Brown's across the passage.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
