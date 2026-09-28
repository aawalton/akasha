import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiAlma = {
  id: "01a0e9ce-117e-7562-a3d5-3c023027438a",
  type: "page-type/lore",
  slug: "otherwhere-ii-alma",
  title: "Alma of the Frozen Flame",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Alma of the Frozen Flame captains the Skyswarm Pirates from the warship Bloody Surprise.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She looks human, with red hair and light green eyes, and towers over most men.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her crews fear her, since she punishes failure with a fate worse than death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her enforcer Baro is a golden-furred giant with a black two-handed sword.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
