import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVoidbears = {
  id: "01a0e9c2-fe15-7281-b6e4-aa254c9f6cac",
  type: "page-type/lore",
  slug: "otherwhere-voidbears",
  title: "Voidbears",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A voidbear is twice a grizzly's size, with filthy gray bristles and bones stuck in its grime.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its legs have too many joints, placed without symmetry, so it lurches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its jaws open far too wide, and a prehensile tongue over three feet long hangs out.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its hide acts like leather armor, its blood is blue and its skeleton is hard as steel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It shifts its organs with mana to dodge killing blows and bend spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pure mana disrupts its tissue shifting, and its weight-bearing joints are its weak points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Voidbears live in packs with a strict pecking order and camp at rifts to eat arrivals.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
