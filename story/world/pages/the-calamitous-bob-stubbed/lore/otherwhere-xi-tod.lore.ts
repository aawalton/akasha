import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTod = {
  id: "01a0ea8a-26e4-706d-8d89-3ad4f148720a",
  type: "page-type/lore",
  slug: "otherwhere-xi-tod",
  title: "Tod",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tod",
  facts: [
    {
      fact: "Tod Seranileso is an ancient archmage, head of the medical faculty of Helock's Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tod is dark-skinned and bearded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tod wanted Viv for his medical faculty when she came to the Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tod saved Tarana, Rakan's sister, in Helock's temple of Enttiku during the riots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tod is among the Academy's scattered staff, since Oleander took Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
