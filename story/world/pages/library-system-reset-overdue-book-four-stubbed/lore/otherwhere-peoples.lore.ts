import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwherePeoples = {
  id: "01a0e94a-ae39-7dbd-9979-349a949bb3d7",
  type: "page-type/lore",
  slug: "otherwhere-peoples",
  title: "The Peoples Who Come to the Library",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  facts: [
    {
      fact: "Courtesies' first part covers the commonest patrons: elves, satyrs, Bectiwode and Aracnio.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "Elves give a stranger their house's name before their own, and hear a bare name as cold.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "Satyrs take a refused offer of food as a slight, and a shared meal as friendship begun.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "The Bectiwode hear a low chitter back as warmth, and a silent answer as coldness.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "The Aracnio greet with a dip of the forelegs; a hand thrust out to shake startles them.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
  ],
} as const satisfies Lore
