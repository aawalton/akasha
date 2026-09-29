import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiReixa = {
  id: "01a0ea86-d672-78fd-ba9a-852291c59b72",
  type: "page-type/place",
  slug: "otherwhere-xi-reixa",
  title: "Reixa",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Reixa is a large Enorian market city, the last major city before the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reixa is the hub for trade between Enoria and Harrak's Kazar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reixa is known for permonn liquor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The outlaw Elix seized Reixa during Enoria's civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reixa rebuilt after the civil war with bank loans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reixa is ruled by the old one-armed Duke Ediar, whose heir is his grandson Gedis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Innkeepers on the Deadshield road offer girls 'from Reixa' to travellers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reixa has a Harrakan portal gate on the route from Harrak to the north.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
