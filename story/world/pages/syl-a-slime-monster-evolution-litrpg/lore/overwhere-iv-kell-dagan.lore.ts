import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvKellDagan = {
  id: "01a0ed2e-5594-7496-bf71-5d332998a2db",
  type: "page-type/lore",
  slug: "overwhere-iv-kell-dagan",
  title: "Kell Dagan",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Kell Dagan leads the Red Hand bandits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is a disgraced silver adventurer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Identify shows him as Human LV 33, Duelist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His bandits wear a red hand painted on cloth or leather.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
