import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVHarrowmere = {
  id: "01a0ea01-27f3-7239-a50d-2d707307d8a8",
  type: "page-type/place",
  slug: "otherwhere-v-harrowmere",
  title: "Harrowmere",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-elothia",
  exits: [
    {
      to: "place/otherwhere-v-serrin-river",
      way: "Up the river road on the Serrin's north bank, or upriver by boat, to Serrinford; three days.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "Harrowmere is a walled market town of about three thousand where the Serrin meets a wide lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrowmere lies three days down the Serrin from Serrinford, by boat or by the river road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A council of guild masters rules Harrowmere and claims the whole Serrin Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrowmere buys the upper vale's scalebark timber for ships, masts and roof beams.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A notice board in Harrowmere's market square carries carved and chalked offers of paid work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Harrowmere board posts monster bounties, caravan guard work, dock labour and scribe work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrowmere has a ranger chapterhouse that commands the lodges up the vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mage in Harrowmere, Corvel Anthe, teaches spellcraft and letters for pay in a narrow tower-house.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Labour brokers in Harrowmere buy and sell the work-contracts of the poor and indebted.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrowmere's market sells boots, cloth, iron, glass, spices and books, at prices above Serrinford's.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
