import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJorasTheElder = {
  id: "01a0ea89-b5d1-7931-8eaf-13fed2308bbd",
  type: "page-type/lore",
  slug: "otherwhere-xi-joras-the-elder",
  title: "Joras the Elder",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-joras-the-elder",
  facts: [
    {
      fact: "Joras the Elder was an archmage of the last Harrakan dynasty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Joras taught that intent molds magic, and clear communication makes clear intent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Joras the Elder is long dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
