import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvAldousCrane = {
  id: "01a0ed2e-0f6b-794e-9f32-0a50c01fb2c2",
  type: "page-type/lore",
  slug: "overwhere-iv-aldous-crane",
  title: "Reeve Aldous Crane",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Aldous Crane is careful and cautious, and he weighs every word.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The reeve is afraid of the baroness's nephew, Cedric Tarrow.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
