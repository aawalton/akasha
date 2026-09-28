import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereKitchen = {
  id: "01a0e559-88b3-7e7e-85f9-4749c3d48456",
  type: "page-type/place",
  slug: "otherwhere-kitchen",
  title: "The Kitchen",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  facts: [
    {
      fact: "The kitchen lies through an arched door on the main hall's right side, down a short corridor.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-links"],
    },
    {
      fact: "The kitchen is long and warm, with hanging copper pots, a great stone oven and an oak table.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fresh loaves cool on the oak table, baked by the kitchen on its own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only the great oven is lit; the other hearths stay cold until the kitchen's golems return.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pantry off the kitchen holds a dozen sacks of coarse salt, each about twenty pounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pantry also keeps jars of honey and bins of roots and vegetables.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
