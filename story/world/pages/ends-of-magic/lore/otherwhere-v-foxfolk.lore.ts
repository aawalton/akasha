import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFoxfolk = {
  id: "01a0e9f4-0047-7744-94f4-6835adf682b9",
  type: "page-type/lore",
  slug: "otherwhere-v-foxfolk",
  title: "Foxfolk",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-foxfolk",
  facts: [
    {
      fact: "Foxfolk are one of Davrar's animal-peoples, slim and fox-like.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Foxfolk live in Gemore, where some are mages of gravity or force.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A foxfolk woman and a human man can marry and raise children together in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
