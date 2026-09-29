import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiSleepingBearInn = {
  id: "01a0ed25-5ac6-7ac2-b239-9444d7383ee8",
  type: "page-type/place",
  slug: "overwhere-ii-sleeping-bear-inn",
  title: "The Sleeping Bear Inn",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Sleeping Bear Inn stands on Creston's square, its sign a bear with flowers and mushrooms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aspirants waiting for escorts over the Gnarl lodge and train behind the Sleeping Bear Inn.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
