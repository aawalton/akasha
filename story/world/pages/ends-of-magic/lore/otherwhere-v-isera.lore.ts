import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVIsera = {
  id: "01a0e9fc-4337-7f5b-aa78-860eb75a3c04",
  type: "page-type/lore",
  slug: "otherwhere-v-isera",
  title: "Isera",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-isera",
  facts: [
    {
      fact: "Isera is one of the old gods, killed by the Questors on Ostren in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
