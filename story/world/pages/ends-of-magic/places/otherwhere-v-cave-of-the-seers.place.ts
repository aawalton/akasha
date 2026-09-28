import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVCaveOfTheSeers = {
  id: "01a0e9f5-b469-742e-8fea-edd51cdbcb47",
  type: "page-type/place",
  slug: "otherwhere-v-cave-of-the-seers",
  title: "The Cave of the Seers",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-itonia",
  facts: [
    {
      fact: "The Cave of the Seers lies high in the tall mountain that towers over Itonia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
