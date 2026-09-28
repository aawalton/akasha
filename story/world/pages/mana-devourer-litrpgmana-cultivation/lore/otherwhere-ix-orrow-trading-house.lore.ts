import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxOrrowTradingHouse = {
  id: "01a0ea3e-2066-7132-bc0d-4fd33700b5d4",
  type: "page-type/lore",
  slug: "otherwhere-ix-orrow-trading-house",
  title: "Orrow Trading House",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-organization/otherwhere-ix-orrow-trading-house",
  facts: [
    {
      fact: "The Orrow Trading House holds Halvard's charter over the Kessen Zone's roads and tolls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow is seated in Kessenhold and runs every waystation on the Brass Road, Tollmere too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow ledgers everything: every cart, core, toll, debt and head that passes its gates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow buys unclaimed otherworlders and sells them east toward the great arenas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow pays catchers by the head for the unclaimed: more for the strong, less for the sick.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow's factors wear grey coats with a brass ledger-and-sun badge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow's seal on a paper makes it good anywhere on the Brass Road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow hires caravan guards, beaters, clerks and road wardens by the season.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anyone found on the road with no papers and no kin is counted unclaimed in Orrow's books.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
