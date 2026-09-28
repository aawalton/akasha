import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGiantsrestContinent = {
  id: "01a0e9f2-9014-7779-be14-dbb5a1e37590",
  type: "page-type/place",
  slug: "otherwhere-v-giantsrest-continent",
  title: "The Giantsrest Continent",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "The continent holds Giantsrest, Halsmet, Gemore, Old Gemore, Litcliff and Agmon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The orcish empire of Agmon dominates the continent's far west.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantsrest and Agmon lie so far apart that between them they span the continent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mountains lie between Giantsrest and Gemore, with fortress-city Halsmet on the way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sea of grass stretches between Gemore's region and the empire of Agmon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Litcliff on the southern coast is the continent's port route to other lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The magic that sustains the whole continent lies within the Seal under Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The continent lies a couple of continents away from Itonia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beyond city walls, monsters and dungeons fill the wild lands, as on most continents.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
