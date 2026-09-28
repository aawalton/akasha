import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVElementalFolk = {
  id: "01a0e9f4-fc80-7f28-b389-0e2387029ba8",
  type: "page-type/lore",
  slug: "otherwhere-v-elemental-folk",
  title: "Elemental-Folk",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-elemental-folk",
  facts: [
    {
      fact: "Elemental-folk are thinking elementals, unlike the raging, mindless fire elementals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elemental-folk are seen among the many peoples of the city of Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some intelligent elementals live in the mountains beyond Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
