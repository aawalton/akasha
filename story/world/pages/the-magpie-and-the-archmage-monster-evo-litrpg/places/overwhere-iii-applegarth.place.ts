import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiApplegarth = {
  id: "01a0ed23-174d-73c6-8300-4893e94ea5dc",
  type: "page-type/place",
  slug: "overwhere-iii-applegarth",
  title: "Applegarth",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-wrenwood-crossroads",
      way: "West along the east road six miles, past hedges, to the crossroads shrine.",
      direction: "west",
    },
    {
      to: "place/overwhere-iii-thornmere",
      way: "East along the road, two more days through hill villages, to the city of Thornmere.",
      direction: "east",
    },
  ],
  facts: [
    {
      fact: "Applegarth is an orchard hamlet of some thirty houses, six miles east of the crossroads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its three cider presses supply the Wrenmark; its cider is sold as far as Thornmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tobin Wick lives here in a stone cottage with a mule shed, next to the Hesper orchard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Widow Hesper owns the biggest orchard and the biggest press, and the hamlet heeds her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Applegarth has no wall, only a thorn hedge and a watch rota of farmers with pitchforks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jackalopes raid the orchards each spring for young bark, and the hamlet pays to be rid of them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
