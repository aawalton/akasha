import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKit = {
  id: "01a0ea8c-81fc-777a-a942-8c648627d670",
  type: "page-type/lore",
  slug: "otherwhere-xi-kit",
  title: "Kit",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kit",
  facts: [
    {
      fact: "Kit is the majordomo of General Jaratalassi.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kit is thought to keep the general's household this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
