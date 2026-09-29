import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBlackDel = {
  id: "01a0ea79-96af-7e14-8df9-26a18d6d5994",
  type: "page-type/lore",
  slug: "otherwhere-xi-black-del",
  title: "Black Del",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-black-del",
  facts: [
    {
      fact: "Black Del was underboss of the Wayfarers, a Helock gang smuggling weapons for a coming war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Black Del was a fourth-step fighter whose skills let him hide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis killed Black Del when the Wayfarers kidnapped Arthur in Helock; Black Del is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
