import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinVale = {
  id: "01a0e9fa-bb14-719e-9b61-6cdb9859ff5b",
  type: "page-type/place",
  slug: "otherwhere-v-serrin-vale",
  title: "The Serrin Vale",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-elothia",
  exits: [
    {
      to: "place/otherwhere-v-harrowmere",
      way: "Down the river road or by boat along the Serrin to Harrowmere; three days, south-west.",
      direction: "south",
    },
    {
      to: "place/otherwhere-v-dragonwolf-heights",
      way: "North up the vale's head through deep wood to the high crags; four days on foot.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "The Serrin Vale is a long river valley on Elothia's settled rim, running north to south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Serrin River runs down the vale floor from crags in the north toward Harrowmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Greyscale Wood covers the vale's northern and western slopes above the river.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oak woods called the Hillboar Oaks cover the vale's far, southern side of the river.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford is the only village in the upper vale; Harrowmere lies three days downriver.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outside Serrinford, a handful of farmsteads and one watermill hold the vale floor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The upper vale lives on scalebark timber, floated downriver in rafts to Harrowmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elothian Rangers keep a lodge at Serrinford and patrol the upper vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Early autumn in the vale brings warm days, near-freezing nights and the first rains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A small dungeon, Thornmouth, lies two days north of Fern Hollow in the Greyscale Wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dragonwolf pair ranges the crags at the vale's head, four days north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Treeborn tribe keeps a grove in the deep wood a day and a half east of Fern Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Serrin Vale lies far from any great power; no lord rules it but Harrowmere's council.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
