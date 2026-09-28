import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFireSalamander = {
  id: "01a0ea36-ee71-7359-82e5-6d98da4ee2e0",
  type: "page-type/lore",
  slug: "otherwhere-ix-fire-salamander",
  title: "Fire salamander",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-fire-salamander",
  facts: [
    {
      fact: "Fire salamanders are elemental lizards of flame, one of Firrelia's elemental creatures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They are bred and traded by those who deal in monsters and blood magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their stock went into the trimander, a three-headed hybrid of fire, frost and acid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their grade, cores and haunts are not common knowledge in Sun City.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
