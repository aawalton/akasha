import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiYoro = {
  id: "01a0e9cd-42e7-73cc-9e9f-c306b3e59bdf",
  type: "page-type/lore",
  slug: "otherwhere-ii-yoro",
  title: "Yoro the Axemaster",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Yoro is an axemaster, eight feet tall, with dense crimson fur, white horns and a mustache.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He lives in a whole town deep beneath an ocean where giant glowing squids swim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He casts protective magic so training blows break bones but do not kill.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
