import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGiant = {
  id: "01a0e9f4-fc81-7f9c-b43d-6ecd90372988",
  type: "page-type/lore",
  slug: "otherwhere-v-giant",
  title: "Giant",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-giant",
  facts: [
    {
      fact: "Giants once lived on Davrar, but none walk free in this age.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tales hold that the giants had a great strength and majesty, now lost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy of Giantsrest is nearly mountain-sized, its spire built to a giant's scale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy of Giantsrest is also called the Grave of All Giants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stone giants once dwelt in the Grave of All Giants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Giantsrest mages hail their founder as the Giant: "Praise to the Giant!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Giantsrest oaths include "Giant\'s Blood" and "sure as the Giant\'s fist".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Waking giants" is a curse, and "the woken giant" means the ultimate foe.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
