import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVAshenAccordEstate = {
  id: "01a0e9f9-e636-7682-a097-8371e80c5965",
  type: "page-type/place",
  slug: "otherwhere-v-ashen-accord-estate",
  title: "The Ashen Accord Estate",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-blinded-mountain",
  facts: [
    {
      fact: "The Ashen Accord keeps an estate in the Blinded Mountain's crack.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A magic gate opens on a long tunnel into the estate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The estate has a hotel-like lobby, suites, a spa, a bar and a canteen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
