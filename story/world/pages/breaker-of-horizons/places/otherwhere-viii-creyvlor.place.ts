import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiCreyvlor = {
  id: "01a0ea37-ce14-76c8-bd37-333465ec6162",
  type: "page-type/place",
  slug: "otherwhere-viii-creyvlor",
  title: "Creyvlor",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Creyvlor, sometimes spelled Crevylor, is a city just north of Geldor, the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Creyvlor is a handful of hours from Geldor by train, or a whole night's drive by highway.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Spire rises in Creyvlor, and a train line runs through its coverage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Dundale home in Creyvlor has a driveway, a garden and a workshop at the back of the garden.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glenside, a smaller town, lies just east of Creyvlor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Last winter a police convoy was ambushed on the highway soon after leaving Creyvlor's city limits.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
