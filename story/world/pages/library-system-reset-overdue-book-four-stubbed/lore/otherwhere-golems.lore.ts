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
      fact: "The Library's golems are stirring now, grinding deep inside, shelvers among them.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-alan",
        "character-other/otherwhere-links",
      ],
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
      fact: "The shelving golems come fully awake and up to the main hall by the next morning.",
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
      fact: "By morning the two shelving golems stand silent beside the Counter, waiting on her word.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/otherwhere-links",
        "character-player/otherwhere-alan",
      ],
    },
  ],
} as const satisfies Lore
