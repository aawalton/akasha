import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiLydia = {
  id: "01a0ed1f-fabc-7f06-991e-31d56ec8cf1c",
  type: "page-type/lore",
  slug: "overwhere-ii-lydia",
  title: "Lydia",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Lydia is Denar's pale-haired, cheerful Untalented wife, a merchant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bandits shot and poisoned Lydia; Harker healed her fully with diluted Last Grace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lydia says Last Grace is worth a whole fleet of wagons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lydia took to Adhira, and waved Harker goodbye until the wagons were out of sight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lydia rides with Denar west toward the Sunken City.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
