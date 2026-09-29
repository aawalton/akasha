import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKinnir = {
  id: "01a0ea8c-81fc-7c9e-a923-d99a249a687e",
  type: "page-type/lore",
  slug: "otherwhere-xi-kinnir",
  title: "Kinnir",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kinnir",
  facts: [
    {
      fact: "Kinnir is a priest of Enttiku at the temple in Markeis, the lawless Enorian river city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv gave Kinnir's temple her limb regrowth circle as she passed down the River Shal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kinnir is thought to serve at Markeis still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
