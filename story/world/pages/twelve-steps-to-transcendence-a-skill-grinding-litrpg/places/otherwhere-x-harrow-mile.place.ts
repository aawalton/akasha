import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXHarrowMile = {
  id: "01a0ea60-77f6-7171-b330-d89d18bf2c6a",
  type: "page-type/place",
  slug: "otherwhere-x-harrow-mile",
  title: "Harrow Mile",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  facts: [
    {
      fact: "Harrow Mile is a stretch of rutted cart road between harvested barley fields.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "A waist-high milestone sits at the road's edge, lichen on its north face.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "The milestone is carved: HARROW 2 with an arrow east, and a worn crest above.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "The crest on the milestone is the royal mark of Sulon, a Central Plains kingdom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hawthorn hedge runs along the field's edge, heavy with red berries.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "Wood smoke rises from beyond a low rise to the east.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "Harrow is a farming village of some forty households two miles east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The road runs west to a ford and a soldiers' waystation half a day on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harvest is in; the stubble fields are gleaned and the evenings turn cold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobody travels this stretch after dusk; carts go by in daylight to and from market.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The road runs east and west; westward it slopes down toward a line of trees.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
  ],
} as const satisfies Place
