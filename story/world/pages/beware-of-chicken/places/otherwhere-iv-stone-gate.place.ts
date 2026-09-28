import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvStoneGate = {
  id: "01a0ea0e-2c56-77f9-bd1a-aac7826950f6",
  type: "page-type/place",
  slug: "otherwhere-iv-stone-gate",
  title: "Stone Gate",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "Stone Gate is a mountain gap between the Howling Fang Mountains and Yellow Rock Plateau.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stone Gate is the main way into the Azure Hills from the Cloudy Sword Sect's direction.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From Stone Gate's heights, a cultivator can see the whole Azure Hills province below.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Azure Hills ship grain up to the Howling Fang Mountains by way of Stone Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
