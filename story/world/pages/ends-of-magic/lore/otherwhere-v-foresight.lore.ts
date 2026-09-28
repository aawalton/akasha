import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVForesight = {
  id: "01a0ea00-60ac-76ca-b86a-fa35e8516f53",
  type: "page-type/lore",
  slug: "otherwhere-v-foresight",
  title: "Foresight",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-foresight",
  facts: [
    {
      fact: "Prophecy and foresight are real magics on Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Seers of Itonia foretell by joining Ushia's Insights to a leyline under their cave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Foretelling drains ambient magic into the seers, who bleed from the nose under strain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wizardry lets a wizard see and nudge fate, even to foresee blows in a fight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fate-reading is the lower form of fate-weaving.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fate-weavers speak rhymes that become prophecies and slow enemy magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fate-weaving is countered by answering speech in the same meter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Breaking the rhyme of a fate-weaver's speech breaks the spell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "'Prophecy of death' is a common saying.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
