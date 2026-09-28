import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxMateria = {
  id: "01a0ea3f-4544-748a-94a0-eb834af0e3f0",
  type: "page-type/place",
  slug: "otherwhere-ix-materia",
  title: "Materia",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-entrerea",
  facts: [
    {
      fact: "Materia is a D Grade desert zone on Entrerea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sun City sits at the center of Materia, the jewel amidst the desert.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A clear white barrier parts Materia from the Malar Zone, bleeding away around the roads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the Malar side, desert slopes down to the white barrier and Sun City beyond.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "King Magul's kingdom bleeds over from the Malar Zone into Materia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Materia's monsters are D Grade, the prey of elite hunters paid in gold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The air over Materia is dry, with a fierce sun by day and windy evenings.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
