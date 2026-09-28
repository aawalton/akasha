import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxGlassgrassFlats = {
  id: "01a0ea1f-36ba-7f08-b107-707abcfaf72c",
  type: "page-type/place",
  slug: "otherwhere-ix-glassgrass-flats",
  title: "The Glassgrass Flats",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "The Glassgrass Flats are open plains of stiff, pale, translucent grass that chimes in wind.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ix-nala"],
    },
    {
      fact: "Glassgrass blades are sharp at the edges and nick bare skin.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ix-nala"],
    },
    {
      fact: "The sky over the Flats is a deep, clear blue with a faint violet cast toward the horizon.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ix-nala"],
    },
    {
      fact: "The Flats are an E grade zone; its beasts are weak by this world's measure, not a human's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Far to the east a thin dark line on the horizon is a walled waystation on a trade road.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ix-nala"],
    },
    {
      fact: "The waystation is Tollmere, a half day's walk away, run by a trading house.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hunters cross the Flats to take beast cores, and slavers watch the roads for the unclaimed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stunted black-barked trees with leaves glinting like metal stand alone here and there on the Flats.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ix-nala"],
    },
    {
      fact: "Something low, hidden in the glassgrass, crept toward Nala, stopped close by, and sniffed.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ix-nala"],
    },
  ],
} as const satisfies Place
