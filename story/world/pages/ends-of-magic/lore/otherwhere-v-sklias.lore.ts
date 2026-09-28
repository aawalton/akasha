import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSklias = {
  id: "01a0e9fb-fb54-7450-b865-f2e3fbae796b",
  type: "page-type/lore",
  slug: "otherwhere-v-sklias",
  title: "Sklias",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-sklias",
  facts: [
    {
      fact: "Sklias is an ancient figure who gives his name to a tomb outside Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sklias Dominion of old left dungeons of serpentine architecture.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season the tomb of Sklias lies outside Gemore, full of undead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
