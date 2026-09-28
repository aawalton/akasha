import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxArthriticImp = {
  id: "01a0ea3d-08c0-7960-9ce1-8a39ce12fdf9",
  type: "page-type/lore",
  slug: "otherwhere-ix-arthritic-imp",
  title: "The Arthritic Imp",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-arthritic-imp",
  facts: [
    {
      fact: "The arthritic imp is Merril's older cart partner on the runs to the lower levels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The arthritic imp has killer arthritis and a short temper, and slaps Merril quiet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season the arthritic imp works the carts beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
