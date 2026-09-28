import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxThreeHeadedCat = {
  id: "01a0ea37-617d-7717-ba26-2639d9dd6173",
  type: "page-type/lore",
  slug: "otherwhere-ix-three-headed-cat",
  title: "Three-headed cat",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-three-headed-cat",
  facts: [
    {
      fact: "Three-headed cats are beasts kept caged in the prisons beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hunt and eat vermin; one was seen devouring an oversized rat in its cage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The arena buys them as monster stock, alongside ogre-like brutes and stranger horrors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their grade and cores are not common knowledge.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
