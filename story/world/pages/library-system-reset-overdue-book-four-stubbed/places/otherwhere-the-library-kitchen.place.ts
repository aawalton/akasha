import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereTheLibraryKitchen = {
  id: "01a0e559-88b3-7e7e-85f9-4749c3d48456",
  type: "page-type/place",
  slug: "otherwhere-the-library-kitchen",
  title: "The Kitchen",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  exits: [
    {
      to: "place/otherwhere-i-main-hall",
      way: "Back along the short corridor and through the arched door into the main hall.",
      direction: "east",
    },
    { way: "Through the wide door onto the staff dining hall." },
    { way: "Through the pantry's low door at the far end, beside the great oven." },
  ],
  facts: [
    {
      fact: "The kitchen lies through an arched door on the main hall's right side, down a short corridor.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-i-alan",
        "character-other/otherwhere-i-links",
      ],
    },
    {
      fact: "The kitchen is long and warm, with hanging copper pots, a great stone oven and an oak table.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Fresh loaves cool on the oak table, baked by the kitchen on its own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala found fresh loaves cooling on the kitchen's oak table, with no one there who baked them.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Only the great oven is lit; the other hearths stay cold until the kitchen's golems return.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The kitchen's bread is dense and nutty, with a crust glazed in honey.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The pantry's low door is at the kitchen's far end, beside the great oven.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "A wide door opens from the kitchen onto a long staff dining hall, dim, its tables dust-sheeted.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "A pantry off the kitchen holds six sacks of coarse salt, each about twenty pounds.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "Nala can carry one sack of salt easily, or two at a stagger; more takes extra trips.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The Library's honey carries a faint magic, and a bookworm is drawn to its smell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Honey holds a thick crust of salt that clings through a tussle better than damp cloth does.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
    {
      fact: "The pantry also keeps jars of honey and bins of roots and vegetables.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-i-alan"],
    },
  ],
} as const satisfies Place
