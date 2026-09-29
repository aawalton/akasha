import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXSpeedReading = {
  id: "01a0ea7e-e4c4-7e95-95e4-3364c1d0af5c",
  type: "page-type/lore",
  slug: "otherwhere-x-speed-reading",
  title: "Speed Reading",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-speed-reading",
  facts: [
    {
      fact: "[Speed Reading] is a Common skill, rare in the Plains, where few read at all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "[Speed Reading] is passive: the eye takes in a page at a sweep and the mind keeps it whole.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It works on any script the reader knows, and on the System's own words.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A holder remembers what they read far longer and clearer than most.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scholars' children and archive clerks sometimes hold it; nobles prize such clerks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Learning from a manual, a technique or a skill-path volume goes quicker for a holder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Evolution paths seen in archives: Speed Reading, Total Recall, Pattern Sight, Cipher Eye.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
