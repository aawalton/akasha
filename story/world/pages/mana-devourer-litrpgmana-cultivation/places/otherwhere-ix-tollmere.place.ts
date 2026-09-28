import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxTollmere = {
  id: "01a0ea40-2b20-7399-b3df-072507c3b057",
  type: "page-type/place",
  slug: "otherwhere-ix-tollmere",
  title: "Tollmere",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-kessen-zone",
  facts: [
    {
      fact: "Tollmere is a walled Orrow waystation on the Brass Road, at the eastern edge of the Flats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere is half a day's walk east of where Nala woke; its wall is the dark line she saw.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere's wall is timber on a stone footing, with one gate east and one gate west.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stone well tower rises in Tollmere's middle; its deep well is the only sure water for miles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere holds a caravan yard, stables, the Ringing Cup inn, a hunters' post and the factor's house.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stockade pens by Tollmere's east gate hold the unclaimed until a caravan takes them east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About sixty people live in Tollmere, and twice that when a caravan lies over.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere's gates shut at dusk against hollowmanes and open at first light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere's gate guards ask every stranger's name, business and papers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stranger with no papers is held at Tollmere's gate for the factor to judge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Everyone in Tollmere speaks Common.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bed at the Ringing Cup costs three silver; a hot meal a silver; a cup of ale four copper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere's hunters' post buys cores: G for a few copper, F a few silver, E a gold or more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tollmere's hunters' post pins bounties on a board and hires beaters for hunts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A beater earns five silver a day and a share of meat, and walks ahead of the hunters.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
