import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxDrathokOffice = {
  id: "01a0ea41-cb07-7e51-9b8b-394911bd75a3",
  type: "page-type/place",
  slug: "otherwhere-ix-drathok-office",
  title: "Drathok's Office",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-dungeon",
  facts: [
    {
      fact: "Drathok's office is his study in the arena dungeon, where he runs the arena's business.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The office is somewhere between organised and a recent hurricane, piled with papers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok's oak desk was split once and later has a hole kicked through it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok keeps healing potions and papers in the desk drawers, and smokes cigars here.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok mends and tidies the office by levitation.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
