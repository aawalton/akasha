import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiLauFi = {
  id: "01a0ed32-78b6-72d6-b9d0-9cb58fb79009",
  type: "page-type/lore",
  slug: "overwhere-iii-lau-fi",
  title: "Lau'fi",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-lau-fi",
  facts: [
    {
      fact: "Lau'fi is a winged antkin scout, eager and a workaholic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She says every moment not spent working is a moment wasted.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She finds the common language vexing and forgets names.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antkin wings are poor, short-range; Liora carried her to the desert kingdom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She went with Liora to spy on the desert kingdom's capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When guards came, she escaped by burrowing; antkin dig fast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scouts check food, enemies and changes in the desert every day.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Now she is home in the anthill.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
} as const satisfies Lore
