import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAresi = {
  id: "01a0e9f7-46c8-7e27-b19e-372dee5e7392",
  type: "page-type/lore",
  slug: "otherwhere-v-aresi",
  title: "Aresi",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-aresi",
  facts: [
    {
      fact: "Aresi is the goddess of the dawn, one of the old gods of Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rosy-white marble of Dawn's Concord on Ostren carries Aresi's blessing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aresi's blessing outlasts her; the gods died in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
