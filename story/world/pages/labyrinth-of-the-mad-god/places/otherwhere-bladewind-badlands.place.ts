import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereBladewindBadlands = {
  id: "01a0e9bd-41f0-7e2d-90e1-dd986a9e41fd",
  type: "page-type/place",
  slug: "otherwhere-bladewind-badlands",
  title: "The Bladewind Badlands",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-earth",
  facts: [
    {
      fact: "The Bladewind Badlands are arid badlands on new land west of North America's old coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Red and orange earth, stone spires and mesas fill a region hundreds of miles across.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A river runs from a five-mile lake to the sea, and three more rivers branch from the lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cliff hundreds of miles long splits lowland from highland, and a waterfall pours over it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three snowy peaks rise in the northeast, home to pines, wolves and elephant-sized grizzlies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crystal trees hum in the wind, and some flowers float up from their roots like balloons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bladewind is a red dust storm full of razor crescents of wind mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shelter in a cave or crevice is the only sure way to survive a bladewind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nights fall almost to freezing.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
