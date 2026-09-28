import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTheLibraryBreakRoom = {
  id: "01a0e93b-e4cb-7bb1-8051-9c5839907f58",
  type: "page-type/place",
  slug: "otherwhere-the-library-break-room",
  title: "The Break Room",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  depth: 0,
  exits: [
    {
      to: "place/otherwhere-the-library-main-hall",
      way: "Through the plain wooden door onto the main hall's left side, partway back along the columns.",
      direction: "west",
    },
  ],
  facts: [
    {
      fact: "The break room's door opens off the hall's left side, partway back along the columns.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "A break room off the hall holds a dead magical cooler and overgrown terrarium gardens.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The break room's cupboards also hold chipped mugs, a dented tin scoop and a small bucket.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The break room's dead magical cooler is dry and tight, a fit store for dried bookworms.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The dead cooler is a knee-high chest she can drag when empty, and it holds all five coils.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala dragged the dead cooler out, loaded all five coils and dragged it back to the break room.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The break room has a stone sink whose tap still runs cold, clean water.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The break room's large box of salt, which never spoils, is now empty.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala took the dented tin scoop from the break room; it holds a good fistful of salt.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
  ],
} as const satisfies Place
