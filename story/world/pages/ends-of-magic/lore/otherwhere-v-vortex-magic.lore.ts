import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVVortexMagic = {
  id: "01a0ea01-fcc6-7cd1-98b6-08b8eba7656b",
  type: "page-type/lore",
  slug: "otherwhere-v-vortex-magic",
  title: "Magic of the Vortices",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-vortex-magic",
  facts: [
    {
      fact: "Vortices are places where the ocean drains down into the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vortices are sources of powerful magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The most aggressive leviathans of all live near the vortices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Named vortices include the Elidian, the Godsblood and the Hailian.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wary captains keep a thousand leagues or more from any vortex.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
