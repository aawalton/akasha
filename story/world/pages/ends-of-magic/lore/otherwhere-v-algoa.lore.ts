import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAlgoa = {
  id: "01a0e9f6-d51f-7b2a-bd5e-99bb61712666",
  type: "page-type/lore",
  slug: "otherwhere-v-algoa",
  title: "Algoa",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-algoa",
  facts: [
    {
      fact: 'Algoa is an old power of luck; folk bless each other with "May Algoa\'s luck ride with you."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The lucky are called "Algoa-blessed."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like all the old gods, Algoa has no living presence in this age; only the blessing remains.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
