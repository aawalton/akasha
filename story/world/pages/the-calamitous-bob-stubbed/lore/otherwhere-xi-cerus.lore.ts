import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCerus = {
  id: "01a0ea7b-2e7c-7f9b-8419-d9bc8e45ceb0",
  type: "page-type/lore",
  slug: "otherwhere-xi-cerus",
  title: "Cerus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-cerus",
  facts: [
    {
      fact: "Cerus is a fighter of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cerus raided the southern tribes' slavers with Marruk and Koro, freeing captive kin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Cerus is thought to serve in Harrak's army after the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
