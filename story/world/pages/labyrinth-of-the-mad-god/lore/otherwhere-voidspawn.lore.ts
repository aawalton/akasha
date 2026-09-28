import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVoidspawn = {
  id: "01a0e9c2-fe15-7fe0-b54e-e38abb541e81",
  type: "page-type/lore",
  slug: "otherwhere-voidspawn",
  title: "Voidspawn",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Voidspawn are monsters that nest in the space between worlds rather than in conduits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Voidspawn spiders have ten uneven legs ending in black spikes and dark purple scales.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their acid silk eats stone and barriers, and they yank prey back with tethers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hide their killing intent until they strike.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
