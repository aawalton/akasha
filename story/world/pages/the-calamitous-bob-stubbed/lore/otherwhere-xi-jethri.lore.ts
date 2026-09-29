import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJethri = {
  id: "01a0ea89-b5d0-74f6-a108-728f4d5faf93",
  type: "page-type/lore",
  slug: "otherwhere-xi-jethri",
  title: "Ser Jethri",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jethri",
  facts: [
    {
      fact: "Ser Jethri is a veteran Baranese diplomat, once King Erezak's ambassador to Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jethri was hostile to Harrak and sowed doubt at the war council against the undead horde.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak's dragons cowed Jethri at Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "King Erezak, Jethri's master, is dead; Jethri's place and whereabouts this season are unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
