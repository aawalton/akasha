import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIHospitalWing = {
  id: "01a0e859-54b9-7a6e-b479-700f1a4bec7b",
  type: "page-type/place",
  slug: "otherwhere-i-hospital-wing",
  title: "The Hospital Wing",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  facts: [
    {
      fact: "The Library's hospital wing stays shut and dark until the Library has more power to open it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
  ],
} as const satisfies Place
