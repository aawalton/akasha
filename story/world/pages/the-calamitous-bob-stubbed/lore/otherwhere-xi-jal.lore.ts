import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJal = {
  id: "01a0ea88-c43c-7d37-a6c9-ca7a0f12d64a",
  type: "page-type/lore",
  slug: "otherwhere-xi-jal",
  title: "Jal",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jal",
  facts: [
    {
      fact: "Jal was one of Luten's Dark Blades, the assassins sent against the Red Tribe and Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jal died when the Dark Blades were wiped out on the Kark steppes; Jal is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
