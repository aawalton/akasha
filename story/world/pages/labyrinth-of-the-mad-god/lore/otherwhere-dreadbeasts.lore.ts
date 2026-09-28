import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereDreadbeasts = {
  id: "01a0e9c2-fe15-7000-af35-94cca73c1b69",
  type: "page-type/lore",
  slug: "otherwhere-dreadbeasts",
  title: "Dreadbeasts",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Dreadbeasts are corrupted creatures that drain essence, mana, stamina and health.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They give nothing back to the world and leave only bones and dust.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dreadbeasts rise from thralls to lords to monarchs and beyond.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dreadbeast tigers invade Earth while humans are away, led by a tiger king.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They love to talk, since they rarely meet anything worth talking to.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
