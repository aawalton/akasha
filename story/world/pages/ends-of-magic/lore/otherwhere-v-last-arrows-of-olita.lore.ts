import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLastArrowsOfOlita = {
  id: "01a0ea04-4cd3-79aa-ab4b-db9e66d56477",
  type: "page-type/lore",
  slug: "otherwhere-v-last-arrows-of-olita",
  title: "Last Arrows of Olita",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-last-arrows-of-olita",
  facts: [
    {
      fact: "The Last Arrows of Olita is a divine artifact spell built to destroy armies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Arrow of Olita is a relic of a past Ending that can wipe out an army of Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Arrow is spent forever once loosed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Arrows are strategic weapons; their use makes every Questor feel threatened.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grids may unite against whoever looses a strategic weapon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
