import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSaryasPalace = {
  id: "01a0e9fb-3498-7848-98a2-dce811f53403",
  type: "page-type/place",
  slug: "otherwhere-v-saryas-palace",
  title: "Sarya's Palace",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-keihona",
  facts: [
    {
      fact: "Sarya's palace joins the city of Keihona by a huge causeway.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lift rises into the palace from an underground harbor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The palace has a glass hall far below sea level, looking out under the ocean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The causeway to the palace hides fortifications along its length.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enchantments on the undersea hall calm the sea monsters that swarm outside its glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The palace garden has trees whose leaves drip water.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
