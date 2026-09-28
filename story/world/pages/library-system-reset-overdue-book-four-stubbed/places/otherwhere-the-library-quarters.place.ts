import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTheLibraryQuarters = {
  id: "01a0e859-54b9-7469-a2a7-5023857bb76e",
  type: "page-type/place",
  slug: "otherwhere-the-library-quarters",
  title: "The Librarian's Quarters",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  exits: [
    {
      to: "place/otherwhere-i-main-hall",
      way: "Along the short passage to the hall, behind the Check-in Counter.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The Librarian's quarters open off the hall behind the Check-in Counter, for a synced Librarian.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The Librarian's quarters hold a wide bed, a wardrobe, and a bathroom with a deep stone tub.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The quarters have a deep stone tub but no shower; thick linen towels hang beside it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "A short passage behind the Counter leads to the quarters, a snug wood-panelled room.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Under a dust sheet the Librarian's bed is clean, soft and wide.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala slept her first night in the quarters, and woke to the smell of fresh bread.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The wardrobe's robes are deep blue wool, whole and unmothed, smelling of cedar; two hang there.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The wardrobe holds a past Librarian's plain robes, long on Nala but wearable.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The wardrobe's felt slippers are soft on Nala, and a little big.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Links heated Nala's filled tub for a point of the Library's power.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The quarters' taps now run hot.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
  ],
} as const satisfies Place
