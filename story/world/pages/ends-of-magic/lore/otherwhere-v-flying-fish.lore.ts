import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFlyingFish = {
  id: "01a0e9fa-9425-7331-b972-f378b88148ab",
  type: "page-type/lore",
  slug: "otherwhere-v-flying-fish",
  title: "Flying Fish",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-flying-fish",
  facts: [
    {
      fact: "Flying fish emit blasts of heat from red dots under their eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flying fish fry up well and are eaten by sailors.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
