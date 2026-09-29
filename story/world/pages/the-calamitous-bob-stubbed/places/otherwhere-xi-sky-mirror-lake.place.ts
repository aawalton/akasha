import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSkyMirrorLake = {
  id: "01a0ea8a-7b7a-7d10-9bbf-b5af1c9c24df",
  type: "page-type/place",
  slug: "otherwhere-xi-sky-mirror-lake",
  title: "Sky-Mirror Lake",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-kark-steppes",
  facts: [
    {
      fact: "Sky-Mirror Lake is a crater lake several kilometers wide on the Kark steppes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sky-Mirror Lake is holy truce ground where kark tribes meet in peace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Great Bazaar, the kark trading hub, is held at Sky-Mirror Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Great Bazaar sells pakar, root vegetables, gold, spears, gambesons and carvings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A council headed by the Mediator, who wears a big hat, keeps the peace at Sky-Mirror Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kark camp in yurts around Sky-Mirror Lake, each tribe's field running in a band to the water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Red Tribe holds land at Sky-Mirror Lake and rents plots there to other tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
