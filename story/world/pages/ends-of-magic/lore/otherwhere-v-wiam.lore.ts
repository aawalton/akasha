import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVWiam = {
  id: "01a0e9f5-cfaf-7075-a4e3-ed7c8ad293d4",
  type: "page-type/lore",
  slug: "otherwhere-v-wiam",
  title: "Wiam",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-wiam",
  facts: [
    {
      fact: "Wiam is the fourth member of Vhala's Gemore scouting team.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Wiam keeps the team's camp in the pine forest west of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
