import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiErengisTheElder = {
  id: "01a0ea81-c5cd-7700-9439-a9713375d57d",
  type: "page-type/lore",
  slug: "otherwhere-xi-erengis-the-elder",
  title: "Erengis the Elder",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-erengis-the-elder",
  facts: [
    {
      fact: "Erengis the Elder was a mage researcher of the late Harrakan Empire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Erengis framed the paradigm of non-directional, unmanifested mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Erengis taught that a caster's conduits are metaphysical organs; Erengis is long dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
