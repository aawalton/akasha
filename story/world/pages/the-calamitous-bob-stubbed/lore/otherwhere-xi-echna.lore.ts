import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEchna = {
  id: "01a0ea91-ff2a-7410-9c78-61951659a317",
  type: "page-type/lore",
  slug: "otherwhere-xi-echna",
  title: "Echna",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-echna",
  facts: [
    {
      fact: "Echna is a heroine of Kark legend, told of in the tale Echna to Pariah.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the tale Echna gave up everything she had for her tribe, and became a pariah.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Echna lived long ago; the Kark still tell her story.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
