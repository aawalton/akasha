import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVStingmidge = {
  id: "01a0ea08-8542-75cc-b1ca-e8143fc04fb6",
  type: "page-type/lore",
  slug: "otherwhere-v-stingmidge",
  title: "Stingmidge",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-stingmidge",
  facts: [
    {
      fact: "Stingmidges are tiny black flies that swarm over still water at dawn and dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stingmidge bite raises an itching red welt that lasts a day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stingmidges go for bare skin, faces and ankles first.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke drives stingmidges off, and mud or scalebark resin on skin keeps them from biting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stingmidges are harmless beyond misery, and die off with the first hard frost.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
