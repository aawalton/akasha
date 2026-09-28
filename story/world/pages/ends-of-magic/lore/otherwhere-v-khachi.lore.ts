import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVKhachi = {
  id: "01a0e9fc-f50b-7a37-9883-0d1da1373078",
  type: "page-type/lore",
  slug: "otherwhere-v-khachi",
  title: "Khachi",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-khachi",
  facts: [
    {
      fact: "Khachi is a young wolfman of Gemore, adopted son of Kia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He keeps faith in Deiman, dead god of righteous battle, and walks the Path of Faith.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His mother kept religious books; he holds clearing dungeons a duty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He hates sweet drinks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Khachi lives in Gemore and has never met Nathan Lark.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
