import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiiPriyaRaman = {
  id: "01a0ea71-2e66-701f-9207-4bcb7cfb93d9",
  type: "page-type/lore",
  slug: "otherwhere-iii-priya-raman",
  title: "Priya Raman",
  world: "world/super-supportive",
  about: "character-other/otherwhere-iii-priya-raman",
  facts: [
    {
      fact: "The ER social worker is Priya Raman, thirty-four, quick, practical and hard to shock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She comes on at eight and reaches the waiting room by about a quarter past.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
