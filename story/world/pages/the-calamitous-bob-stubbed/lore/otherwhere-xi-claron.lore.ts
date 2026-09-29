import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiClaron = {
  id: "01a0ea7c-e4a8-737c-b303-3b2a8d1cef26",
  type: "page-type/lore",
  slug: "otherwhere-xi-claron",
  title: "Claron",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-claron",
  facts: [
    {
      fact: "Claron is Helock's ambassador to the Paramese Alliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Claron sat at the Mornyr summit where Harrak was admitted to the alliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helock's council sided with Oleander and was butchered; Claron's fate this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
