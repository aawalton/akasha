import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereGolems = {
  id: "01a0e82c-5b35-7986-9145-92079b3b1bd8",
  type: "page-type/lore",
  slug: "otherwhere-golems",
  title: "The Library's Golems",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  facts: [
    {
      fact: "The Library has two shelving golems, each reshelving some twenty books a day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A woken golem takes up work only at a Librarian's spoken command.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-alan",
        "character-other/otherwhere-links",
      ],
    },
    {
      fact: "The shelving golems are tall and thin, pale oak and brass, with long jointed arms and no faces.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "Shelving golems never speak; they answer a command with a slow creaking bow and set to work.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "A shelving golem's long arms reach the high shelves without a ladder, but it works slowly.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
    {
      fact: "The two shelving golems are shelving the main hall's loose books, working out from the Counter.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-alan",
        "character-other/otherwhere-links",
      ],
    },
  ],
} as const satisfies Lore
