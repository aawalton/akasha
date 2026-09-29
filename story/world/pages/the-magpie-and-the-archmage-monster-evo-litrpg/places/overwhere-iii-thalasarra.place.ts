import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiThalasarra = {
  id: "01a0ed2f-54b6-73b3-8442-31dee30b2673",
  type: "page-type/place",
  slug: "overwhere-iii-thalasarra",
  title: "Thalasarra",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-seabloom-island",
      way: "Up to the surface and ten minutes' flight back to Seabloom.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "Thalasarra is a merfolk city in a deep sea cavern, not far from Abylport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies about ten minutes' flight past sight of Seabloom Island, far below the waves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An arch of smooth rocks and seaweed, like a castle gate, leads in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its houses are carved rock with coral-garden roofs and lights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its merfolk farm coral and seaweed and herd fish with dolphin shepherds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A water mana node sits at its center on a carved pedestal; its corals need it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a small grove city beside the great merfolk city of the southern seas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its merfolk kill humans who come near, so humans do not know it exists.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Calypra, an orca mermaid, her shark mate Varrox and daughter Azmira live there.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
