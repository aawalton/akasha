import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiGrandBeach = {
  id: "01a0ea84-fb27-7ea9-992e-a6b00d78e7cc",
  type: "page-type/place",
  slug: "otherwhere-xi-grand-beach",
  title: "The Grand Beach",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-zazas",
  facts: [
    {
      fact: "The Grand Beach is a kilometer-long white sand beach near Zazas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beige cliffs back the Grand Beach, with a single ramp down to the sand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ice forms on the Grand Beach in winter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the Grand Beach this winter Harrak ambushed and destroyed a Nemeti fleet by night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "More than ten thousand Nemeti came to the Grand Beach; few left.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak's flagship, the Sword of Neriad, burned at the Grand Beach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golems walked the seabed and dragons dropped them onto Nemeti ships at the Grand Beach.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
