import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDelric = {
  id: "01a0e9f9-65e0-7aa8-ae04-b5bb19890ad2",
  type: "page-type/lore",
  slug: "otherwhere-v-delric",
  title: "Delric",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-delric",
  facts: [
    {
      fact: "Delric is an adventurer of Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Delric adventures out of Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
