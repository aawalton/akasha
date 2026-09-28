import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxMaxenBrothel = {
  id: "01a0ea42-fcc0-7194-8ee5-829043d4d8c8",
  type: "page-type/place",
  slug: "otherwhere-ix-maxen-brothel",
  title: "Maxen's Brothel",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "Maxen's brothel is a great house of pleasure owned by Maxen, God of Service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hundreds of lower-ranked workers there are owned outright by Maxen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A few exclusive, much-sought courtesans work there above the rest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The brothel puts on shows for its guests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maxen's portal amulets can reach the brothel from up to thirty miles away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maxen wants mana drawn nightly from livestock and poured into his workers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
