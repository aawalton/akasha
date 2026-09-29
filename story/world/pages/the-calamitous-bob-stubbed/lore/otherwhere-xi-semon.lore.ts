import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSemon = {
  id: "01a0ea86-00cd-71a0-8441-32e599a189cf",
  type: "page-type/lore",
  slug: "otherwhere-xi-semon",
  title: "Semon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-semon",
  facts: [
    {
      fact: "Semon was a corrupt guard officer of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Semon is dead, killed by Viv's black powder bomb in a Helock warehouse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helock's council used Semon's death as the pretext to arrest Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
