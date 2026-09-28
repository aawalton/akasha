import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiPax = {
  id: "01a0e9ce-df77-74e0-94ef-97cbb01013b5",
  type: "page-type/lore",
  slug: "otherwhere-ii-pax",
  title: "Pax, the Momentary Mentor",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Pax guides new survivors through orientation for only a brief moment each.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
