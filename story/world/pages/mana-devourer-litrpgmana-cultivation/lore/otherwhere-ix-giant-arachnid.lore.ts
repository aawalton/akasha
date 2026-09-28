import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxGiantArachnid = {
  id: "01a0ea36-5f15-7fec-9b13-8736da824986",
  type: "page-type/lore",
  slug: "otherwhere-ix-giant-arachnid",
  title: "Giant arachnid",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-giant-arachnid",
  facts: [
    {
      fact: "A giant arachnid lurks in the dark lower levels beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a spider of monstrous size, among the deadliest things in those caves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Even hunters strong enough to kill the cave giants turn and flee on sight of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like most cave monsters it keeps out of torchlight unless noise draws it close.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its grade, its core and what its core gives are unknown to anyone who has met it and lived.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
