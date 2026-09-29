import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShaya = {
  id: "01a0ea7d-3779-7d70-83b6-05cecb392e76",
  type: "page-type/lore",
  slug: "otherwhere-xi-shaya",
  title: "Shaya",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shaya",
  facts: [
    {
      fact: "Princess Shaya is a royal heir of Glastia, half-sister of Sidjin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shaya was a rival heir in the Glastian succession contest, backed by alliances.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shaya commanded Glastia's army in the purge of the beastlings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Shaya is in Glastia, a power of its army and court.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
