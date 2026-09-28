import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVVhala = {
  id: "01a0e9f5-cfaf-7b51-973a-f0ad848e640a",
  type: "page-type/lore",
  slug: "otherwhere-v-vhala",
  title: "Vhala",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-vhala",
  facts: [
    {
      fact: "Vhala is short and wide, with dark brown skin and dreadlocks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vhala wears leather armor and a fur cloak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vhala leads a Gemore scouting team whose members are Artha, Emerald and Wiam.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore, a free city of escaped slaves, sends such teams to watch Giantsrest's research towers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Vhala's team scouts the pine forest by a new tower west of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
