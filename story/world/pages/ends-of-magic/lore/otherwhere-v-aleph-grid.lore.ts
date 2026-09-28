import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAlephGrid = {
  id: "01a0e9fd-72d0-710d-8c39-2fe54909d210",
  type: "page-type/lore",
  slug: "otherwhere-v-aleph-grid",
  title: "The Aleph Grid",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-aleph-grid",
  facts: [
    {
      fact: "The Aleph grid is a large grid of Questors led by Evesor, a pale mage in black robes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid is mage-heavy, with superior long-range magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid is to Badud's allies what the Ashen Accord is to Sarya's, and is allied with Badud.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid entices new and unaffiliated Questors with pleasures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid has always been at war with the Ashen Accord, over prestige rather than land.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid is linked to the Questor called the Maestro.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid treasured the adamantium blade that killed the first lich.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
