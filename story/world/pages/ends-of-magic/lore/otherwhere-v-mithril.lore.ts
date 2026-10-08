import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVMithril = {
  id: "01a0ea03-09a3-7aee-b54f-0b669633ab5e",
  type: "page-type/lore",
  slug: "otherwhere-v-mithril",
  title: "Mithril",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-mithril",
  facts: [
    {
      fact: "Mithril weapons are magically forged, and their resilience is rooted in wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sussu's vault in Esebus is sealed with foot-thick mithril that takes five minutes to open.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:54:22.755Z",
  updatedAt: "2026-09-28T21:54:25.000Z",
} as const satisfies Lore
