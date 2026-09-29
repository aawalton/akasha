import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNim = {
  id: "01a0ea82-d976-7e91-b3ae-a662be86d7ae",
  type: "page-type/lore",
  slug: "otherwhere-xi-nim",
  title: "Nim",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-nim",
  facts: [
    {
      fact: "Nim runs with the gang of Lim the Fell-Handed in Helock's underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nim's gang served Solfis's crime network in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Nim is in Helock's underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
