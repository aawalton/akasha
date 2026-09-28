import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereMagitech = {
  id: "01a0e9d4-c3da-71d5-a2ca-91499a345041",
  type: "page-type/lore",
  slug: "otherwhere-magitech",
  title: "Magitech",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Magitech is technology powered by crystallized mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It includes magelights, barrier generators, wands, turrets, traps, vehicles and assistants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most barriers use a rigid framework of force mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Catastrophe-class shield devices glow neon red and would fry anything that touches them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some airships in dead cities also ride rails like trains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Kastillan lamps and bog mining machines are early examples of magitech.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Magitech from different makers shows different layouts and colors from System messages.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
