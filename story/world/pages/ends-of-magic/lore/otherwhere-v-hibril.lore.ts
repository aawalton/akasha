import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHibril = {
  id: "01a0e9fb-eb72-75cc-a0f4-88bc3b038bd3",
  type: "page-type/lore",
  slug: "otherwhere-v-hibril",
  title: "Hibril",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-hibril",
  facts: [
    {
      fact: "Hibril is an archmage able to disintegrate on a great scale, tied to the town of Azamar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Hibril holds an archmage's station, likely under Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
