import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxFanata = {
  id: "01a0ea3f-4543-7fbf-a527-f9b6e5f09187",
  type: "page-type/place",
  slug: "otherwhere-ix-fanata",
  title: "Fanata",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-entrerea",
  facts: [
    {
      fact: "Fanata is a region of Entrerea on the circus caravans' routes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Fanata, the rulers arrange marriages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Fanata adultery is punished by the death of both lovers and their families.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fanatan law seeks the extinction of an adulterer's whole bloodline.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
