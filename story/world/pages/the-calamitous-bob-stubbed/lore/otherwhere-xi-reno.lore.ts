import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiReno = {
  id: "01a0ea84-282f-7dc3-8abc-a05860a1d8f5",
  type: "page-type/lore",
  slug: "otherwhere-xi-reno",
  title: "Reno",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-reno",
  facts: [
    {
      fact: "Bishop Reno is a bishop of the Church of Maranor, hostile to Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reno's church held Prince Gil of Enoria hostage in Mornyr to watch King Sangor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Mornyr is a blighted ruin, and Reno's fate is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
