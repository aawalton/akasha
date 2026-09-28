import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiBlightbane = {
  id: "01a0e9d1-a3d9-723f-bba1-ab39a5f92d77",
  type: "page-type/lore",
  slug: "otherwhere-ii-blightbane",
  title: "Blightbane",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Blightbane is a curved four-foot Kastillan sword of the rarest silvery metal of its world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Minute channels etched from tip to hilt conduct its wielder's mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When found it is broken, acid-eaten and missing its pommel stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It slowly regrows its missing metal and grows heavier as it heals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wielder needs at least fourteen Strength to use it at full potential.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
