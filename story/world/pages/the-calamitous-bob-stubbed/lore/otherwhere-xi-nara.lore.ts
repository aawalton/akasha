import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNara = {
  id: "01a0ea81-9b15-7aee-8658-b1d900bbe5af",
  type: "page-type/lore",
  slug: "otherwhere-xi-nara",
  title: "Nara",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-nara",
  facts: [
    {
      fact: "Nara was the assistant of Magister Sterek in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nara's master Sterek stole Sidjin's teleport research, and was ruined and killed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Nara's whereabouts are unknown; she was last in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
