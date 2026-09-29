import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvGrafgeoIslet = {
  id: "01a0ed2b-5884-75f1-a26e-d633ac2747e6",
  type: "page-type/place",
  slug: "overwhere-iv-grafgeo-islet",
  title: "Grafgeo Islet",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Grafgeo Islet is a small human-settled island off the coast near Saltport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The islet has a mild climate and rich soil, ideal for fruit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Plantations on Grafgeo grow coconuts, bananas and other tropical fruit for the mainland.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A single wooden dock serves the boats that carry Grafgeo fruit to port.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A small brineling camp on the islet's shore was wiped out by an unseen hunter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Planters on Grafgeo keep watch for brinelings coming out of the surf at night.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
