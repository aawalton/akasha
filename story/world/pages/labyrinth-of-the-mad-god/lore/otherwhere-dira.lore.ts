import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereDira = {
  id: "01a0e9ce-117e-7b56-85be-865927c4df1e",
  type: "page-type/lore",
  slug: "otherwhere-dira",
  title: "Dira",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Dira is a four-foot humanoid rabbit covered in feathers, a summoner and archer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She lives in an immense glowing cavern and rides a finned azure crocodile summon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her voice magic carries a hundred feet, and her summons include fire-clawed silver eagles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
