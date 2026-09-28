import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxTalisman = {
  id: "01a0ea40-bcb6-7644-8b6c-5ee9acc74ff8",
  type: "page-type/lore",
  slug: "otherwhere-ix-talisman",
  title: "Talisman",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-talisman",
  facts: [
    {
      fact: "A talisman holds a single-use spell, and it is burned to set the spell off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Burning a talisman without knowing its spell is dangerous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talisman markings are written in old spell-tongues that no system translates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talismans may be shaped like small paper fans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A talisman's writing can glow red at a mana-sensitive touch, then fade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A torn fan-shaped talisman lay in an old chest in the Sun City arena depths.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
