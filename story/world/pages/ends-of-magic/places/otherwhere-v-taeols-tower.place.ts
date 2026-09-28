import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVTaeolsTower = {
  id: "01a0e9f3-cc56-7fb7-9545-ceff8a0eab1e",
  type: "page-type/place",
  slug: "otherwhere-v-taeols-tower",
  title: "Taeol's Research Tower",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "Taeol's research tower is a ways west of Giantsrest, given him by the Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy gave Taeol the tower only weeks ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tower is built of seamless pale stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A huge square stairwell climbs about 100 feet to a grand mosaic hall with a fountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tower's giant doors are sealed shut with magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stone plaza lies before the doors, and a road winds away through scraggly pines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fortress-city of Halsmet lies a short way south of the tower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scouting teams from Gemore watch Giantsrest's research towers from the pine forest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
