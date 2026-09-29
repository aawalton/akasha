import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvSelby = {
  id: "01a0ed2e-0f6c-7714-b61a-793aec920fe9",
  type: "page-type/lore",
  slug: "overwhere-iv-selby",
  title: "Old Selby",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Old Selby is the herb-wife of Millbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is grey-haired, sharp-eyed and sparing with words.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town trusts her salves and fears her tongue.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
