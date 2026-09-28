import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDeiman = {
  id: "01a0e9f9-65e0-782f-9bce-05b6c988c1ce",
  type: "page-type/lore",
  slug: "otherwhere-v-deiman",
  title: "Deiman",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-deiman",
  facts: [
    {
      fact: "Deiman was the god of righteous battle, a guardian turned tyrant, brought low by pride.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deiman died in the Ending of Deicide; his remnant lies in the Crater of Fallen Gods on Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deiman's power once gave deep resurrection.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deiman's old faith keeps a Last Champion among the Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'People swear "By Deiman"; a divine person can feel truth or betrayal in such an oath.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season a young wolfman of Gemore, Khachi, keeps faith in the dead Deiman.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
