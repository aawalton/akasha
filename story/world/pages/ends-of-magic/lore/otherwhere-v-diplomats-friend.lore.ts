import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDiplomatsFriend = {
  id: "01a0e9f9-8feb-7e96-a709-40c17fd31e55",
  type: "page-type/lore",
  slug: "otherwhere-v-diplomats-friend",
  title: "Diplomat's Friend",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-diplomats-friend",
  facts: [
    {
      fact: "Diplomat's friend flashes and whistles when it meets poison in a drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The stronger the poison, the stronger diplomat's friend reacts.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
