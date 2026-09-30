import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvHesperPell = {
  id: "01a0ed2c-5a73-73ea-ac0c-116da52cb817",
  type: "page-type/lore",
  slug: "overwhere-iv-hesper-pell",
  title: "Hesper Pell",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Hesper Pell is the miller of Millbrook, sharp-tongued, quick and worried.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cracked shaft and the backed-up harvest will ruin her if it is not mended soon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hesper would pay well, or owe a great favor, to anyone who fixed her shaft.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hesper's mill shaft has been cracked for weeks, and she can't pay to mend it till she grinds.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
  ],
} as const satisfies Lore
