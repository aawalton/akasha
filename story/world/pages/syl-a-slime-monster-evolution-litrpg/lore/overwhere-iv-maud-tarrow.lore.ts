import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvMaudTarrow = {
  id: "01a0ed2e-5594-77bf-92ff-8db5de86a031",
  type: "page-type/lore",
  slug: "overwhere-iv-maud-tarrow",
  title: "Baroness Maud Tarrow",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Maud Tarrow is the baroness of Tarrow.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "She has no children, and her nephew Cedric is her heir.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She was a firm ruler in her day, and the older folk of the vale remember her fondly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Word in the vale is that she has been ailing since midsummer and seldom leaves the Hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garrett calls Baroness Maud firm but fair, and says she has been poorly since summer.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
