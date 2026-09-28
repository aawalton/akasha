import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSudraiel = {
  id: "01a0e9fe-3d10-710a-8a98-452ecf189c75",
  type: "page-type/lore",
  slug: "otherwhere-v-sudraiel",
  title: "Sudraiel",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-sudraiel",
  facts: [
    {
      fact: "Sudraiel is the old guildmistress of Gemore's Adventurer's Guild; she limps with a spear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "As a guildmaster she sits on the council of seven guildmasters that rules Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guild's courtyard has been Gemore's Adventurer muster ground since the city's founding.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she runs the Adventurer's Guild in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
