import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiLanguage = {
  id: "01a0ea40-a960-7535-807c-46f65ec70969",
  type: "page-type/lore",
  slug: "otherwhere-vii-language",
  title: "Language",
  world: "world/god-of-trash",
  about: "world-mechanic/otherwhere-vii-language",
  facts: [
    {
      fact: "One common tongue is spoken across Orphela and the old Empire, with local accents.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Country folk speak slow and broad; townsfolk quick; nobles and mages clipped and formal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The common tongue is written in a letter script, left to right, that few mortals read.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enchantments are written in lines of mana, in scripts that differ from region to region.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Northern giants speak the tongue deep and slow, and love titles like Lord and Madame.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Words from Earth with no match here come out of Nala's mouth as Earth words.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stranger who reads fluently and talks like a scholar is taken for gentry or a runaway clerk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
