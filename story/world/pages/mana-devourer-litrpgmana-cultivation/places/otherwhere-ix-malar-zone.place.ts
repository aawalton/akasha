import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxMalarZone = {
  id: "01a0ea3f-4544-7613-b677-d716f89bd32c",
  type: "page-type/place",
  slug: "otherwhere-ix-malar-zone",
  title: "The Malar Zone",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-entrerea",
  facts: [
    {
      fact: "The Malar Zone is an F Grade zone controlled by Farros, God of Temperance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farros has held the Malar Zone for about six hundred years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Malar Zone is the heart of King Magul's kingdom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Malar Zone looks almost like an ordinary land, save for a pink sky at the horizon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Floating towers hang above the Malar Zone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Malar Zone has green forests, snowy mountains, and a lake as big as a town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hundred-foot, two-legged behemoth, half tree and half beast, walks the Malar forests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hill on the Malar edge looks over green forest one way and Materia's desert the other.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
