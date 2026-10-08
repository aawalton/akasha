import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiAstra = {
  id: "01a0e9a5-b2a1-7fe0-b06a-c2bdd5633267",
  type: "page-type/lore",
  slug: "otherwhere-ii-astra",
  title: "Astra and Pax",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Astra is a goddess who sponsored Earth's entry into the System.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pax is Astra's envoy, a blond warrior who guides survivors through orientation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pax is known as the momentary mentor, present only briefly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Astra's servants swear by her with the words 'Praise Astra'.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:12:25.633Z",
  updatedAt: "2026-09-28T22:30:51.000Z",
} as const satisfies Lore
