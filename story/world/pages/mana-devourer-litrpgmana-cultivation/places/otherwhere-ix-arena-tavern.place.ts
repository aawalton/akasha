import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxArenaTavern = {
  id: "01a0ea41-cb06-76fc-ae19-8ce603325fca",
  type: "page-type/place",
  slug: "otherwhere-ix-arena-tavern",
  title: "The Arena Tavern",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-dungeon",
  facts: [
    {
      fact: "The arena tavern sits across the walkway from the smithy in the dungeon's central hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tavern has no music; patrons play dice and arm-wrestle for coin slammed on tables.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slaves, fighters and workers drink their lunch at the tavern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tavern serves a thick brown ale, less bitter than expected, with a strong kick.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sanreed serves the tables and tends the bar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The slave and creature market lies opposite the tavern.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
