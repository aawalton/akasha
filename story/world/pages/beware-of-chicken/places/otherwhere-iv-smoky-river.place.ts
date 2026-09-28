import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvSmokyRiver = {
  id: "01a0ea10-019c-7276-be33-545ca5b85834",
  type: "page-type/place",
  slug: "otherwhere-iv-smoky-river",
  title: "Smoky River",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-verdant-hill",
  facts: [
    {
      fact: "Smoky River is a new fox-clan village rising in the Azure Hills near Hong Yaowu and Fa Ram.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lady Su Nezuhua leads the Su fox clan settling Smoky River.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A road built by the ox Bei Be links Smoky River to Hong Yaowu and Verdant Hill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Azure Express steam train runs between Hong Yaowu and Smoky River.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Miantiao made a glass vase of over a hundred thousand cells to welcome Smoky River.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
