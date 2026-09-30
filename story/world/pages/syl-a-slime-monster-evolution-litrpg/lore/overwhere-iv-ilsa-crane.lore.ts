import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvIlsaCrane = {
  id: "01a0ed2d-ba61-71f6-a7e0-91f24cd655ad",
  type: "page-type/lore",
  slug: "overwhere-iv-ilsa-crane",
  title: "Ilsa Crane",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    { fact: "Ilsa Crane is in her late twenties.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Identify shows her as Human LV 14, Clerk.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Ilsa is clever, bored and ambitious.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "She notices talent quickly and wants the Millbrook hall to matter.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Ilsa is the niece of Reeve Aldous Crane.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "She would sponsor a gifted newcomer if it raised the hall's name.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is sharp-featured, ink on her fingers, dark hair pinned up with a pencil.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "She hears all the town's news, and knows by now of the barefoot woman at the gate.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "She would let a watch recruit owe the fee, since the watch pays at week's end.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "She would sell a newcomer on slime work first: safe, steady, and paid by the core.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "Ilsa Crane keeps the Millbrook Adventurers' Hall.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-ilsa-crane",
      ],
    },
  ],
} as const satisfies Lore
