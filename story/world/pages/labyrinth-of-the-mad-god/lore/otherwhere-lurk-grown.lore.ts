import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereLurkGrown = {
  id: "01a0e9cc-700a-7bc0-b9d6-5634e74ad0cb",
  type: "page-type/lore",
  slug: "otherwhere-lurk-grown",
  title: "Lurk, the Grown Hunter",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The lurk eats only fresh meat.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
