import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVItonia = {
  id: "01a0e9f5-4f84-7f95-b19b-bea14e8938b6",
  type: "page-type/place",
  slug: "otherwhere-v-itonia",
  title: "Itonia",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Itonia lies beneath a tall mountain that holds the Cave of the Seers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Itonia is a couple of continents away from Gemore's continent.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
