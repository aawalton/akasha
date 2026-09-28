import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVStella = {
  id: "01a0e9f8-7a18-793f-88f3-48cc448f3376",
  type: "page-type/lore",
  slug: "otherwhere-v-stella",
  title: "Stella Caxol",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-stella",
  facts: [
    {
      fact: "Stella Caxol is a young mage of Gemore with braided red hair.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is the daughter of the mage Dalo and the slim foxfolk Kullal, who hold posts in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She grew up in a mansion with a garden in Gemore, a city founded by escaped slaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She favors fire magic, and her Talent Conduit of Mana is her own form of Mana Shaping.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she is a young adventuring mage of Gemore, not yet known beyond it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
