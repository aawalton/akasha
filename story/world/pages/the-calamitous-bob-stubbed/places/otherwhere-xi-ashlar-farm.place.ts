import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiAshlarFarm = {
  id: "01a0eaac-def3-74f3-a84d-bbb151c2e87f",
  type: "page-type/place",
  slug: "otherwhere-xi-ashlar-farm",
  title: "The Ashlar Farm",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-wether-hills",
  exits: [
    {
      to: "place/otherwhere-xi-waystone-shrine",
      way: "Up the hill road, three quarters of an hour's climb to the waystone ring.",
    },
    {
      to: "place/otherwhere-xi-tavelford",
      way: "Down the hill road, a quarter hour to the village square.",
    },
  ],
  facts: [
    {
      fact: "The Ashlar farm is the first house on the hill road, a quarter hour above Tavelford.",
      knowers: ["lore-disclosure/game-master", "world-character/otherwhere-xi-tobin-ashlar"],
    },
    {
      fact: "The house is low fieldstone dug half into the slope, flat-roofed, with a blue-painted door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside is one long room: a hearth, a loom, sleeping shelves and a curtained corner.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hurdle lambing pen runs along the yard wall, loud with ewes and new lambs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sheepfold behind the house has a plank gate onto the hill; bread is sometimes left there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A small niche by the door holds a clay Sardanal sheaf and a worn bronze key of Maradoc.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tobin's sisters, Pell of nine and Lissa of six, feed the hens and mind the lambs in the yard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mid-morning the farm smells of dung, woodsmoke and barley bread baking in the ash.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
