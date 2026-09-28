import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSarah = {
  id: "01a0e9f8-7a17-7d21-9ef7-5cc105b5edd0",
  type: "page-type/lore",
  slug: "otherwhere-v-sarah",
  title: "Sarah",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-sarah",
  facts: [
    {
      fact: "Sarah is a young woman of Gemore, twin sister of the warrior Aarl.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her father is the jovial Stanel of Gemore, and her forebears were slaves of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is an archer whose sight reaches very far.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she is a young adventurer of Gemore, not yet known beyond it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
