import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiHalfwayLake = {
  id: "01a0ea80-ba6d-709f-8c9b-6373f9925866",
  type: "page-type/place",
  slug: "otherwhere-xi-halfway-lake",
  title: "Halfway Lake",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-deadshield-woods",
  facts: [
    {
      fact: "Halfway Lake lies midway along the road through the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halfway Lake is the only safe stop on the Deadshield road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak keeps paired portal gates at Halfway Lake: one to Anelton, one to Kazar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gates at Halfway Lake work as an airlock between Enoria and Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On foot, Halfway Lake is some three or four days from either edge of the woods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
