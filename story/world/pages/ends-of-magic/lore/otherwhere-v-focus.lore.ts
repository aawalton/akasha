import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFocus = {
  id: "01a0e9f9-efb3-77e5-b3d9-577d7103ab70",
  type: "page-type/lore",
  slug: "otherwhere-v-focus",
  title: "Focus",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-focus",
  facts: [
    {
      fact: "Focus is a resource some classes grant; it keeps the mind going under stress.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Focus shows under its class in the status as current over maximum.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Focus recovers over time, fastest while the holder has room for thought.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Focus is spent to work quickly, sharpen attention, improve control and stay conscious.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Focus is spent to shake off mental attacks and to strengthen mental protection skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Focus fed to a mental protection skill can block another's reading of one's status.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Focus can push one's senses through antimemetic effects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stealth class skills can spend Focus to deepen their effect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Focus maximum rises by a fixed amount each class level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Other class resources exist, such as Faith for the faithful and a mana pool for mages.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
