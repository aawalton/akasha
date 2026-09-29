import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIBrokenFang = {
  id: "01a0ed27-1226-7808-a359-451f032a047f",
  type: "page-type/place",
  slug: "overwhere-i-broken-fang",
  title: "The Broken Fang",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "The Broken Fang is a range of peaks shaped like a fanged mouth with one fang snapped off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Broken Fang shows as a great mountain beside a smaller, flat-topped one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Broken Fang is the landmark on the route to the Black Pyre, seen from the wastes' edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Broken Fang rises beyond the Cursed City, to the west of the Umarii lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many goblins and Hob Goblins live in the Broken Fang.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Black Pyre lies past the Broken Fang.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Umarii know the way through the Broken Fang only from maps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No power holds the Broken Fang but its goblin tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
