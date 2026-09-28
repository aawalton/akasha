import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVAshenAccordCampus = {
  id: "01a0e9f5-b468-7dfc-bc3f-7d2b3bceef32",
  type: "page-type/place",
  slug: "otherwhere-v-ashen-accord-campus",
  title: "The Ashen Accord Campus",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "The Ashen Accord's campus lies on its home continent and trains new Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The campus has walled training yards and an arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
