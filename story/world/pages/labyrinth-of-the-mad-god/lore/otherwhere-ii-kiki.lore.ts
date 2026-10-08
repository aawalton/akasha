import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiKiki = {
  id: "01a0e9cd-42e5-740c-817a-b00cd48be95d",
  type: "page-type/lore",
  slug: "otherwhere-ii-kiki",
  title: "Kiki the Combat Doll",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Kiki is a sapient wooden combat doll and Rita's senior student.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has the painted face of a young woman, a black robe and a red sash.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her attributes and fighting level can be set to match a student.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She holds decades of combat experience and a proud, impatient manner.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sapient construct is not bound by the System's limits on what mentors may teach.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:55:38.469Z",
  updatedAt: "2026-09-28T22:34:49.000Z",
} as const satisfies Lore
