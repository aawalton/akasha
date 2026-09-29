import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTars = {
  id: "01a0ea8a-26e4-7cf1-a027-0bc578650127",
  type: "page-type/lore",
  slug: "otherwhere-xi-tars",
  title: "Tars",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tars",
  facts: [
    {
      fact: "Investigator Tars follows a path of ferreting out the truth, and senses conviction in words.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tars tried to prevent the riots that burned through Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tars's whereabouts are unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
