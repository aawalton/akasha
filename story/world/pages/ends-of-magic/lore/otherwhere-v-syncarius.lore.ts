import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSyncarius = {
  id: "01a0e9fb-6916-7125-8579-20291268e275",
  type: "page-type/lore",
  slug: "otherwhere-v-syncarius",
  title: "Syncarius",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-syncarius",
  facts: [
    {
      fact: "Syncarius was the first lich, said to have invented death magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Syncarius is long dead, slain by a blade of adamantium.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
