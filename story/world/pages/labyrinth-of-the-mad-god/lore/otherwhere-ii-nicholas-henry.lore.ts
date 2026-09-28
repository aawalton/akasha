import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiNicholasHenry = {
  id: "01a0e9c9-1a4c-738c-b3b6-3f633ff3550c",
  type: "page-type/lore",
  slug: "otherwhere-ii-nicholas-henry",
  title: "Nicholas 'Nick' Henry",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Nicholas 'Nick' Henry is a human contestant of Earth, a man in his early thirties at integration.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Before integration he is a devoted online gamer who raids with a competitive guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He reads System messages like a gamer, hunting for hidden objectives and secret rewards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is analytical and stubborn, slow to trust and quick to plan.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
