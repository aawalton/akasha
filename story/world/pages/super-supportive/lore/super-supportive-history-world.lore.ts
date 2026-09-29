import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveHistoryWorld = {
  id: "01a0e9fc-7b33-7ca9-b068-cb401bdbd526",
  type: "page-type/lore",
  slug: "super-supportive-history-world",
  title: "Earth under the System",
  world: "world/super-supportive",
  about: "world/super-supportive",
  facts: [
    {
      fact: "Avowed are a very small percentage of humanity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is illegal on Earth for Avowed to live among average humans; heroes capture unregistered ones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
