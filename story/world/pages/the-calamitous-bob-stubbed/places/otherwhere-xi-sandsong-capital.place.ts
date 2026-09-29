import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSandsongCapital = {
  id: "01a0ea8c-0796-731e-b12f-88f592be504c",
  type: "page-type/place",
  slug: "otherwhere-xi-sandsong-capital",
  title: "The Capital of Sandsong",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-sandsong",
  facts: [
    {
      fact: "Sandsong's capital is a coastal city of beige stone on the Viziman Ocean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sandsong's capital has braziers in its streets, a lighthouse, a pier and warehouses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fast frigate sails from Sandsong's capital to the Grand Beach near Zazas in about six days.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Evacuation ships carried Sandsong's people from the capital's pier before it fell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sandsong's capital fell to Oleander's side at the winter solstice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In late winter Sandsong's capital is held by Sheem and Oleander's garrison.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
