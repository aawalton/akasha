import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiZeroFive = {
  id: "01a0ea7e-3c7a-79d2-a071-8d113e253db3",
  type: "page-type/lore",
  slug: "otherwhere-xi-zero-five",
  title: "Zero-Five",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-zero-five",
  facts: [
    {
      fact: "Zero-Five is a tall hadal scout of New Harrak who fights with a battleaxe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zero-Five is pale and bald with slit yellow eyes, like all hadals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zero-Five ran to fetch hadal help during the battle at the Baranese pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zero-Five is practising a skill to kill anything.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zero-Five fought for Harrak in the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Zero-Five is with Harrak's hadals after the victory.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
