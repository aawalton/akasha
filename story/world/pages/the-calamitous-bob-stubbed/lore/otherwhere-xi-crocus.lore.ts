import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCrocus = {
  id: "01a0ea7b-2e7c-7dea-bcaa-636c382b8d67",
  type: "page-type/lore",
  slug: "otherwhere-xi-crocus",
  title: "Crocus the Senile",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-crocus",
  facts: [
    {
      fact: "Crocus the Senile is an old commoner of New Harrak, rare in a land where few grow old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crocus came before Viv at her first public audience in Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crocus is thought to live still in New Harrak this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
